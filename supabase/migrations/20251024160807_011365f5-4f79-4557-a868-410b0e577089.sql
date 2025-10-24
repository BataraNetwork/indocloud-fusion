-- Update RLS policies for nodes table to use auth.uid() instead of wallet_address
-- This ensures providers can only manage their own nodes

-- Drop existing policies
DROP POLICY IF EXISTS "Providers can manage their nodes" ON nodes;
DROP POLICY IF EXISTS "Anyone can view nodes" ON nodes;

-- Create new policies using auth.uid()
CREATE POLICY "Anyone can view nodes"
  ON nodes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Providers can insert their own nodes"
  ON nodes
  FOR INSERT
  TO authenticated
  WITH CHECK (provider_wallet = auth.uid()::text);

CREATE POLICY "Providers can update their own nodes"
  ON nodes
  FOR UPDATE
  TO authenticated
  USING (provider_wallet = auth.uid()::text)
  WITH CHECK (provider_wallet = auth.uid()::text);

CREATE POLICY "Providers can delete their own nodes"
  ON nodes
  FOR DELETE
  TO authenticated
  USING (provider_wallet = auth.uid()::text);