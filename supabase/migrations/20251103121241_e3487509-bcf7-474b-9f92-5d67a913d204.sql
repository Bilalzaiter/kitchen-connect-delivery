-- Add metadata column to conversations table
ALTER TABLE public.conversations ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;