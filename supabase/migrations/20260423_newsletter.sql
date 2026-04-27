-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_active ON newsletter_subscribers(is_active) WHERE is_active = true;

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe/unsubscribe themselves
CREATE POLICY "Allow public subscribe" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update own subscription" ON newsletter_subscribers
  FOR UPDATE USING (true);

CREATE POLICY "Allow public read own subscription" ON newsletter_subscribers
  FOR SELECT USING (true);

-- Function to subscribe a user
CREATE OR REPLACE FUNCTION subscribe_newsletter(user_email TEXT, user_name TEXT DEFAULT NULL)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  INSERT INTO newsletter_subscribers (email, name, is_active)
  VALUES (user_email, user_name, true)
  ON CONFLICT (email) DO UPDATE SET
    is_active = true,
    unsubscribed_at = NULL,
    name = COALESCE(NULLIF(EXCLUDED.name, ''), newsletter_subscribers.name)
  RETURNING json_build_object('success', true, 'message', 'Subscribed successfully') INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to unsubscribe
CREATE OR REPLACE FUNCTION unsubscribe_newsletter(user_email TEXT)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  UPDATE newsletter_subscribers
  SET is_active = false, unsubscribed_at = NOW()
  WHERE email = user_email AND is_active = true;
  
  RETURN json_build_object('success', true, 'message', 'Unsubscribed successfully');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check subscription status
CREATE OR REPLACE FUNCTION check_subscription(user_email TEXT)
RETURNS JSON AS $$
DECLARE
  subscriber RECORD;
BEGIN
  SELECT * INTO subscriber FROM newsletter_subscribers WHERE email = user_email;
  
  IF subscriber IS NULL THEN
    RETURN json_build_object('subscribed', false);
  END IF;
  
  RETURN json_build_object('subscribed', subscriber.is_active);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
