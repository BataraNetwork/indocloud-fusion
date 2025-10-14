import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface StorageFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploaded: string;
  ipfsHash?: string;
  storage_path: string;
  meta?: any;
}

export const useStorage = () => {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [storageUsed, setStorageUsed] = useState(0);
  const { toast } = useToast();

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Not authenticated');
      }

      // Fetch file metadata from database
      const { data: dbFiles, error: dbError } = await supabase
        .from('files')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (dbError) throw dbError;

      // Fetch storage files
      const { data: storageFiles, error: storageError } = await supabase
        .storage
        .from('user-files')
        .list(user.id);

      if (storageError) throw storageError;

      // Combine database and storage info
      const combinedFiles: StorageFile[] = (dbFiles || []).map((dbFile) => {
        const meta = typeof dbFile.meta === 'object' && dbFile.meta !== null ? dbFile.meta as any : {};
        const storageName = meta.storage_name || '';
        const storageFile = storageFiles?.find(f => storageName === f.name);
        
        return {
          id: dbFile.id,
          name: meta.original_name || 'Unknown',
          size: storageFile?.metadata?.size || meta.size || 0,
          type: storageFile?.metadata?.mimetype || meta.type || 'unknown',
          uploaded: dbFile.created_at,
          ipfsHash: dbFile.ipfs_cid,
          storage_path: `${user.id}/${storageName}`,
          meta: dbFile.meta
        };
      });

      setFiles(combinedFiles);
      
      // Calculate total storage used
      const total = combinedFiles.reduce((acc, file) => acc + file.size, 0);
      setStorageUsed(total);
      
    } catch (error: any) {
      console.error('Error fetching files:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch files',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Not authenticated');
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('user-files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Save metadata to database
      const { error: dbError } = await supabase
        .from('files')
        .insert({
          user_id: user.id,
          owner_wallet: '', // Keep for backward compatibility
          ipfs_cid: '', // Can be populated later if needed
          meta: {
            original_name: file.name,
            storage_name: fileName,
            size: file.size,
            type: file.type
          }
        });

      if (dbError) throw dbError;

      toast({
        title: 'Success',
        description: `${file.name} uploaded successfully`
      });

      await fetchFiles();
      
      return true;
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Upload Failed',
        description: error.message || 'Failed to upload file',
        variant: 'destructive'
      });
      return false;
    } finally {
      setUploading(false);
    }
  };

  const downloadFile = async (file: StorageFile) => {
    try {
      const { data, error } = await supabase.storage
        .from('user-files')
        .download(file.storage_path);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Success',
        description: `${file.name} downloaded successfully`
      });
    } catch (error: any) {
      console.error('Error downloading file:', error);
      toast({
        title: 'Download Failed',
        description: error.message || 'Failed to download file',
        variant: 'destructive'
      });
    }
  };

  const deleteFile = async (file: StorageFile) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Not authenticated');
      }

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('user-files')
        .remove([file.storage_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('files')
        .delete()
        .eq('id', file.id)
        .eq('user_id', user.id);

      if (dbError) throw dbError;

      toast({
        title: 'Success',
        description: `${file.name} deleted successfully`
      });

      await fetchFiles();
    } catch (error: any) {
      console.error('Error deleting file:', error);
      toast({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete file',
        variant: 'destructive'
      });
    }
  };

  const getFileUrl = async (file: StorageFile) => {
    try {
      const { data } = await supabase.storage
        .from('user-files')
        .createSignedUrl(file.storage_path, 3600); // 1 hour expiry

      return data?.signedUrl || '';
    } catch (error) {
      console.error('Error getting file URL:', error);
      return '';
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return {
    files,
    loading,
    uploading,
    storageUsed,
    uploadFile,
    downloadFile,
    deleteFile,
    getFileUrl,
    refreshFiles: fetchFiles
  };
};
