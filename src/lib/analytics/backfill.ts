/**
 * Analytics Backfill Utilities
 * Auto-backfill missing signup events and other analytics data
 */

import { SupabaseClient } from '@supabase/supabase-js';

export interface BackfillResult {
  success: boolean;
  processedUsers: number;
  createdEvents: number;
  errors: string[];
  details: {
    userId: string;
    email: string;
    hadPriorActivity: boolean;
    eventCreated: boolean;
  }[];
}

/**
 * Auto-backfill signup events for users who don't have one
 * This ensures all metrics that depend on signup events work correctly
 */
export async function backfillSignupEvents(
  supabase: SupabaseClient
): Promise<BackfillResult> {
  const result: BackfillResult = {
    success: true,
    processedUsers: 0,
    createdEvents: 0,
    errors: [],
    details: [],
  };

  try {
    // 1. Get all users
    const { data: allUsers, error: usersError } = await supabase
      .from('users')
      .select('id, email, created_at, auth_id')
      .order('created_at', { ascending: true });

    if (usersError) {
      result.success = false;
      result.errors.push(`Error fetching users: ${usersError.message}`);
      return result;
    }

    if (!allUsers || allUsers.length === 0) {
      result.errors.push('No users found');
      return result;
    }

    // 2. For each user, check if they have a signup event
    for (const user of allUsers) {
      result.processedUsers++;

      // Check if signup event exists
      const { data: existingSignupEvent, error: checkError } = await supabase
        .from('analytics_events')
        .select('id')
        .eq('user_id', user.id)
        .eq('event_type', 'signup')
        .limit(1);

      if (checkError) {
        result.errors.push(`Error checking user ${user.email}: ${checkError.message}`);
        continue;
      }

      // If signup event exists, skip
      if (existingSignupEvent && existingSignupEvent.length > 0) {
        result.details.push({
          userId: user.id,
          email: user.email,
          hadPriorActivity: false,
          eventCreated: false,
        });
        continue;
      }

      // 3. Check if user had prior anonymous activity
      // Look for any events with same email pattern before user creation
      // Or events very close in time to creation (within 5 minutes)
      const fiveMinutesBefore = new Date(user.created_at);
      fiveMinutesBefore.setMinutes(fiveMinutesBefore.getMinutes() - 5);

      const { data: priorEvents, error: priorEventsError } = await supabase
        .from('analytics_events')
        .select('anonymous_id, created_at')
        .is('user_id', null)
        .not('anonymous_id', 'is', null)
        .lte('created_at', user.created_at)
        .gte('created_at', fiveMinutesBefore.toISOString())
        .order('created_at', { ascending: false })
        .limit(1);

      if (priorEventsError) {
        result.errors.push(
          `Error checking prior events for ${user.email}: ${priorEventsError.message}`
        );
      }

      const hadPriorActivity = priorEvents && priorEvents.length > 0;
      const anonymousId = hadPriorActivity ? priorEvents[0].anonymous_id : null;

      // 4. Create signup event
      const signupEvent = {
        user_id: user.id,
        anonymous_id: anonymousId,
        event_type: 'signup',
        tool_type: 'general',
        metadata: {
          method: 'unknown', // We don't know if it was email or Google
          hadPriorAnonymousActivity: hadPriorActivity,
          anonymousId: anonymousId,
          backfilled: true, // Mark as backfilled
          backfilledAt: new Date().toISOString(),
        },
        created_at: user.created_at, // Use user's creation date
        page_url: null,
        referrer: null,
      };

      const { error: insertError } = await supabase
        .from('analytics_events')
        .insert([signupEvent]);

      if (insertError) {
        result.success = false;
        result.errors.push(
          `Error creating signup event for ${user.email}: ${insertError.message}`
        );
        result.details.push({
          userId: user.id,
          email: user.email,
          hadPriorActivity,
          eventCreated: false,
        });
        continue;
      }

      // Success
      result.createdEvents++;
      result.details.push({
        userId: user.id,
        email: user.email,
        hadPriorActivity,
        eventCreated: true,
      });
    }

    return result;
  } catch (error) {
    result.success = false;
    result.errors.push(
      `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
    return result;
  }
}

/**
 * Check backfill status - how many users are missing signup events
 */
export async function checkBackfillStatus(
  supabase: SupabaseClient
): Promise<{
  totalUsers: number;
  usersWithSignupEvent: number;
  usersMissingSignupEvent: number;
  percentageMissing: number;
}> {
  // Total users
  const { count: totalUsers } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true });

  // Users with signup event
  const { data: signupEvents } = await supabase
    .from('analytics_events')
    .select('user_id')
    .eq('event_type', 'signup')
    .not('user_id', 'is', null);

  const usersWithSignupEvent = new Set(signupEvents?.map(e => e.user_id) || []).size;
  const usersMissingSignupEvent = (totalUsers || 0) - usersWithSignupEvent;
  const percentageMissing = totalUsers
    ? (usersMissingSignupEvent / totalUsers) * 100
    : 0;

  return {
    totalUsers: totalUsers || 0,
    usersWithSignupEvent,
    usersMissingSignupEvent,
    percentageMissing,
  };
}
