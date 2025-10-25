import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface DashboardAnalytics {
  totalFiles: number;
  totalStorageGB: number;
  activeBookings: number;
  totalBookings: number;
  totalSpent: number;
  pendingBookings: number;
  completedBookings: number;
  recentActivity: ActivityItem[];
}

interface ActivityItem {
  id: string;
  type: 'booking' | 'file' | 'payment';
  title: string;
  description: string;
  timestamp: Date;
  icon: string;
}

export function useDashboardAnalytics() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<DashboardAnalytics>({
    totalFiles: 0,
    totalStorageGB: 0,
    activeBookings: 0,
    totalBookings: 0,
    totalSpent: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchAnalytics() {
      try {
        setLoading(true);

        // Fetch files data
        const { data: files } = await supabase
          .from('files')
          .select('*')
          .eq('user_id', user.id);

        const totalFiles = files?.length || 0;
        const totalStorage = files?.reduce((acc, file) => {
          const meta = typeof file.meta === 'object' && file.meta !== null ? file.meta as any : {};
          return acc + (meta.size || 0);
        }, 0) || 0;
        const totalStorageGB = totalStorage / (1024 * 1024 * 1024);

        // Fetch bookings data
        const { data: bookings } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id);

        const totalBookings = bookings?.length || 0;
        const activeBookings = bookings?.filter(b => b.status === 'active').length || 0;
        const pendingBookings = bookings?.filter(b => b.status === 'pending').length || 0;
        const completedBookings = bookings?.filter(b => b.status === 'completed').length || 0;
        
        const totalSpent = bookings?.reduce((acc, booking) => {
          return acc + (Number(booking.total_price) || 0);
        }, 0) || 0;

        // Build recent activity
        const recentActivity: ActivityItem[] = [];

        // Add recent bookings
        bookings?.slice(0, 3).forEach(booking => {
          recentActivity.push({
            id: booking.id,
            type: 'booking',
            title: `Booking ${booking.status}`,
            description: `Node rental • ${booking.total_hours}h • ${Number(booking.total_price).toFixed(2)} BTR`,
            timestamp: new Date(booking.created_at),
            icon: 'server',
          });
        });

        // Add recent files
        files?.slice(0, 2).forEach(file => {
          const meta = typeof file.meta === 'object' && file.meta !== null ? file.meta as any : {};
          const size = meta.size || 0;
          const sizeInMB = (size / (1024 * 1024)).toFixed(2);
          
          recentActivity.push({
            id: file.id,
            type: 'file',
            title: 'File uploaded to IPFS',
            description: `${meta.name || 'Unknown'} • ${sizeInMB} MB`,
            timestamp: new Date(file.created_at),
            icon: 'upload',
          });
        });

        // Sort by timestamp
        recentActivity.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

        setAnalytics({
          totalFiles,
          totalStorageGB,
          activeBookings,
          totalBookings,
          totalSpent,
          pendingBookings,
          completedBookings,
          recentActivity: recentActivity.slice(0, 5),
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [user]);

  return { analytics, loading };
}
