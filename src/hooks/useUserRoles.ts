import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type AppRole = 'admin' | 'moderator' | 'user';

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface UserWithRoles {
  id: string;
  email: string;
  display_name: string | null;
  created_at: string;
  roles: AppRole[];
}

export const useUserRoles = () => {
  const { user } = useAuth();
  const [userRoles, setUserRoles] = useState<AppRole[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserRoles();
    } else {
      setUserRoles([]);
      setIsAdmin(false);
      setLoading(false);
    }
  }, [user]);

  const fetchUserRoles = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (error) throw error;

      const roles = data?.map(r => r.role as AppRole) || [];
      setUserRoles(roles);
      setIsAdmin(roles.includes('admin'));
    } catch (error) {
      console.error('Error fetching user roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const hasRole = (role: AppRole) => userRoles.includes(role);

  return {
    userRoles,
    isAdmin,
    hasRole,
    loading,
    refetch: fetchUserRoles,
  };
};

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch all users from profiles with their auth data
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, display_name, created_at');

      if (profilesError) throw profilesError;

      // Fetch roles for all users
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine data - we'll use user_id as email placeholder
      // In production, you'd need an edge function with service role to get emails
      const usersWithRoles: UserWithRoles[] = profilesData.map(profile => {
        const userRoles = rolesData?.filter(r => r.user_id === profile.user_id).map(r => r.role as AppRole) || [];

        return {
          id: profile.user_id,
          email: `${profile.user_id.slice(0, 8)}...`, // Shortened user ID as placeholder
          display_name: profile.display_name,
          created_at: profile.created_at,
          roles: userRoles,
        };
      });

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addRole = async (userId: string, role: AppRole) => {
    const { error } = await supabase
      .from('user_roles')
      .insert({ user_id: userId, role });

    if (error) throw error;
    await fetchUsers();
  };

  const removeRole = async (userId: string, role: AppRole) => {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', role);

    if (error) throw error;
    await fetchUsers();
  };

  return {
    users,
    loading,
    fetchUsers,
    addRole,
    removeRole,
  };
};
