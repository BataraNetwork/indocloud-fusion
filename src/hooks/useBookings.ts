import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Booking {
  id: string;
  node_id: string;
  user_id: string;
  provider_id: string;
  start_date: string;
  end_date: string;
  total_hours: number;
  total_price: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'rejected';
  metadata: any;
  created_at: string;
  updated_at: string;
  nodes?: {
    id: string;
    metadata: any;
    location: string;
    cpu: string;
    gpu: string;
    price_per_hour: number;
  };
}

export interface BookingFormData {
  node_id: string;
  provider_id: string;
  start_date: string;
  end_date: string;
  total_hours: number;
  total_price: number;
  metadata?: any;
}

export const useBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  const fetchUserBookings = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          nodes (
            id,
            metadata,
            location,
            cpu,
            gpu,
            price_per_hour
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data as Booking[] || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData: BookingFormData) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        node_id: bookingData.node_id,
        provider_id: bookingData.provider_id,
        start_date: bookingData.start_date,
        end_date: bookingData.end_date,
        total_hours: bookingData.total_hours,
        total_price: bookingData.total_price,
        metadata: bookingData.metadata || {},
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    await fetchUserBookings();
    return data;
  };

  const cancelBooking = async (bookingId: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId);

    if (error) throw error;
    await fetchUserBookings();
  };

  return {
    bookings,
    loading,
    createBooking,
    cancelBooking,
    refetch: fetchUserBookings,
  };
};

export const useProviderBookings = () => {
  const { user } = useAuth();
  const [providerBookings, setProviderBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProviderBookings();
    }
  }, [user]);

  const fetchProviderBookings = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          nodes (
            id,
            metadata,
            location,
            cpu,
            gpu,
            price_per_hour
          )
        `)
        .eq('provider_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProviderBookings(data as Booking[] || []);
    } catch (error) {
      console.error('Error fetching provider bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (
    bookingId: string,
    status: 'active' | 'rejected' | 'completed'
  ) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId);

    if (error) throw error;
    await fetchProviderBookings();
  };

  return {
    providerBookings,
    loading,
    updateBookingStatus,
    refetch: fetchProviderBookings,
  };
};
