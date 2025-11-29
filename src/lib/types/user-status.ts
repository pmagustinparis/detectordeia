/**
 * UserStatus interface
 * Consolidates all user-related data in a single response
 * to eliminate cascading fetches and flickering UI
 */
export interface UserStatus {
  // Authentication
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string | undefined;
  } | null;

  // Subscription Plan
  plan_type: 'free' | 'premium';

  // Express Pass (24h temporary access)
  express: {
    expires_at: string | null;      // ISO timestamp
    is_active: boolean;              // Pre-calculated on server
    time_remaining_ms: number | null; // Milliseconds remaining
  };
}
