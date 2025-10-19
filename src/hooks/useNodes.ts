import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Node {
  id: string;
  provider_wallet: string;
  price_per_hour: number;
  location: string | null;
  cpu: string | null;
  gpu: string | null;
  reputation: number;
  metadata: any;
  created_at: string;
}

export interface NodeFormData {
  price_per_hour: number;
  location: string;
  cpu: string;
  gpu: string;
  metadata: {
    name: string;
    storage?: string;
    ram?: string;
    network_speed?: string;
    features?: string[];
    type: 'storage' | 'compute';
  };
}

export const useNodes = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('nodes')
        .select('*')
        .order('reputation', { ascending: false });

      if (error) throw error;
      setNodes(data || []);
    } catch (error) {
      console.error('Error fetching nodes:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    nodes,
    loading,
    refetch: fetchNodes,
  };
};

export const useProviderNodes = () => {
  const { user } = useAuth();
  const [providerNodes, setProviderNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProviderNodes();
    }
  }, [user]);

  const fetchProviderNodes = async () => {
    if (!user) return;

    try {
      setLoading(true);
      // Using user_id as provider_wallet identifier
      const { data, error } = await supabase
        .from('nodes')
        .select('*')
        .eq('provider_wallet', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProviderNodes(data || []);
    } catch (error) {
      console.error('Error fetching provider nodes:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNode = async (nodeData: NodeFormData) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('nodes')
      .insert({
        provider_wallet: user.id,
        price_per_hour: nodeData.price_per_hour,
        location: nodeData.location,
        cpu: nodeData.cpu,
        gpu: nodeData.gpu,
        reputation: 0,
        metadata: nodeData.metadata,
      })
      .select()
      .single();

    if (error) throw error;
    await fetchProviderNodes();
    return data;
  };

  const updateNode = async (nodeId: string, updates: Partial<NodeFormData>) => {
    const { error } = await supabase
      .from('nodes')
      .update({
        ...(updates.price_per_hour !== undefined && { price_per_hour: updates.price_per_hour }),
        ...(updates.location && { location: updates.location }),
        ...(updates.cpu && { cpu: updates.cpu }),
        ...(updates.gpu && { gpu: updates.gpu }),
        ...(updates.metadata && { metadata: updates.metadata }),
      })
      .eq('id', nodeId);

    if (error) throw error;
    await fetchProviderNodes();
  };

  const deleteNode = async (nodeId: string) => {
    const { error } = await supabase
      .from('nodes')
      .delete()
      .eq('id', nodeId);

    if (error) throw error;
    await fetchProviderNodes();
  };

  return {
    providerNodes,
    loading,
    createNode,
    updateNode,
    deleteNode,
    refetch: fetchProviderNodes,
  };
};
