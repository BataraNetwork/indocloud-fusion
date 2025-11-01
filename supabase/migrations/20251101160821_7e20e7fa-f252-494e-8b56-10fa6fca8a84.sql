-- Add file_shares table for sharing functionality
CREATE TABLE IF NOT EXISTS public.file_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_id UUID NOT NULL REFERENCES public.files(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL,
  shared_with_email TEXT,
  share_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  access_count INTEGER DEFAULT 0,
  max_access_count INTEGER,
  permissions TEXT[] DEFAULT ARRAY['view']::TEXT[]
);

-- Enable RLS on file_shares
ALTER TABLE public.file_shares ENABLE ROW LEVEL SECURITY;

-- Policies for file_shares
CREATE POLICY "Users can view their own shares"
ON public.file_shares FOR SELECT
TO authenticated
USING (owner_id = auth.uid());

CREATE POLICY "Users can create shares for their files"
ON public.file_shares FOR INSERT
TO authenticated
WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Users can delete their own shares"
ON public.file_shares FOR DELETE
TO authenticated
USING (owner_id = auth.uid());

-- Anyone can view shares with valid token (for public sharing)
CREATE POLICY "Anyone can view shares with token"
ON public.file_shares FOR SELECT
TO anon
USING (
  share_token IS NOT NULL 
  AND (expires_at IS NULL OR expires_at > now())
  AND (max_access_count IS NULL OR access_count < max_access_count)
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_file_shares_token ON public.file_shares(share_token);
CREATE INDEX IF NOT EXISTS idx_file_shares_file_id ON public.file_shares(file_id);