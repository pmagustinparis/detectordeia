import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface UserProfile {
  id: string;
  user_id: string;
  role: string | null;
  primary_use: string | null;
  discovery_source: string | null;
  completed_at: string;
  created_at: string;
  updated_at: string;
}

export function useUserProfile() {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      // Si no está autenticado o aún cargando auth, no hacer nada
      if (!isAuthenticated || authLoading) {
        setLoading(false);
        setHasProfile(false);
        return;
      }

      try {
        const response = await fetch('/api/user/profile');

        if (response.ok) {
          const data = await response.json();
          setProfile(data.profile);
          setHasProfile(data.profile !== null);
        } else {
          setHasProfile(false);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setHasProfile(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, user, authLoading]);

  const refreshProfile = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch('/api/user/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);
        setHasProfile(data.profile !== null);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  return {
    profile,
    hasProfile,
    loading,
    refreshProfile,
  };
}
