import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface FileShare {
  id: string;
  file_id: string;
  owner_id: string;
  shared_with_email?: string;
  share_token: string;
  expires_at?: string;
  created_at: string;
  access_count: number;
  max_access_count?: number;
  permissions: string[];
}

export const useFileSharing = () => {
  const [loading, setLoading] = useState(false);
  const [shares, setShares] = useState<FileShare[]>([]);
  const { toast } = useToast();

  const createShare = async (
    fileId: string,
    options: {
      expiresInHours?: number;
      maxAccessCount?: number;
      sharedWithEmail?: string;
    } = {}
  ): Promise<string | null> => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Not authenticated');
      }

      // Generate unique token
      const shareToken = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      
      let expiresAt = null;
      if (options.expiresInHours) {
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + options.expiresInHours);
        expiresAt = expiry.toISOString();
      }

      const { data, error } = await supabase
        .from('file_shares')
        .insert({
          file_id: fileId,
          owner_id: user.id,
          share_token: shareToken,
          expires_at: expiresAt,
          max_access_count: options.maxAccessCount,
          shared_with_email: options.sharedWithEmail,
          permissions: ['view', 'download']
        })
        .select()
        .single();

      if (error) throw error;

      const shareUrl = `${window.location.origin}/shared/${shareToken}`;
      
      toast({
        title: 'Share link created',
        description: 'Link copied to clipboard',
      });

      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);

      return shareUrl;
    } catch (error: any) {
      console.error('Error creating share:', error);
      toast({
        title: 'Failed to create share',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchShares = async (fileId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('file_shares')
        .select('*')
        .eq('file_id', fileId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setShares(data || []);
    } catch (error: any) {
      console.error('Error fetching shares:', error);
      toast({
        title: 'Failed to fetch shares',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteShare = async (shareId: string) => {
    try {
      const { error } = await supabase
        .from('file_shares')
        .delete()
        .eq('id', shareId);

      if (error) throw error;

      toast({
        title: 'Share deleted',
        description: 'Share link has been removed',
      });

      setShares(shares.filter(s => s.id !== shareId));
    } catch (error: any) {
      console.error('Error deleting share:', error);
      toast({
        title: 'Failed to delete share',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getFileByToken = async (token: string) => {
    try {
      const { data, error } = await supabase
        .from('file_shares')
        .select(`
          *,
          files (*)
        `)
        .eq('share_token', token)
        .single();

      if (error) throw error;

      // Increment access count
      await supabase
        .from('file_shares')
        .update({ access_count: (data.access_count || 0) + 1 })
        .eq('id', data.id);

      return data;
    } catch (error: any) {
      console.error('Error fetching shared file:', error);
      return null;
    }
  };

  return {
    loading,
    shares,
    createShare,
    fetchShares,
    deleteShare,
    getFileByToken,
  };
};
