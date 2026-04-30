-- User profiles table for admin dashboard analytics
-- Tracks: location (from IP geolocation), gender, birth_date
-- Linked to Supabase Auth via auth_id

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  -- Location data (from IP geolocation)
  country TEXT,
  province TEXT,
  city TEXT,
  ip_address TEXT,
  -- Demographics (optional, can be added to profile later)
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  birth_date DATE,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Allow authenticated users to view their own profile
-- Allow service role to view all profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth_id = auth.uid());

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth_id = auth.uid());

-- Policy: Service role can do everything (for admin dashboard)
CREATE POLICY "Service role full access"
  ON user_profiles FOR ALL
  USING (true)
  WITH CHECK (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Index for map distribution queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_country ON user_profiles(country);
CREATE INDEX IF NOT EXISTS idx_user_profiles_province ON user_profiles(province);
CREATE INDEX IF NOT EXISTS idx_user_profiles_gender ON user_profiles(gender);
CREATE INDEX IF NOT EXISTS idx_user_profiles_birth_date ON user_profiles(birth_date);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at);

-- Trigger to create user_profile on new user registration
-- This will be handled in the signup API, not as a trigger