-- Fix the trigger function and ensure proper permissions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved trigger function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer SET search_path = public
AS $$
BEGIN
  -- Insert profile with proper error handling
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email))
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Insert user balance with proper error handling
  INSERT INTO public.user_balances (user_id, indo_balance, staked_amount, total_earned)
  VALUES (NEW.id, 0, 0, 0)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log error but don't fail the auth process
    RAISE WARNING 'Failed to create user profile/balance for %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add unique constraint to user_balances if not exists
ALTER TABLE public.user_balances 
ADD CONSTRAINT IF NOT EXISTS user_balances_user_id_key UNIQUE (user_id);