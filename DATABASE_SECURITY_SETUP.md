# Database Security Setup - User Roles Table

## Important Security Update

Your dashboard now uses a **separate roles table** for enhanced security. This prevents privilege escalation attacks by storing roles in a dedicated table with proper Row Level Security (RLS) policies.

## Required Database Migration

You need to run this SQL in your Supabase SQL Editor to set up the secure roles system:

```sql
-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'chef', 'customer', 'driver');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to get user roles
CREATE OR REPLACE FUNCTION public.get_user_roles(_user_id uuid)
RETURNS SETOF app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
$$;

-- RLS Policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Remove role column from profiles table if it exists
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;

-- Trigger to assign default customer role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Assign default 'customer' role to new users
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'customer');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_role();
```

## How to Apply

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor**
3. Create a new query
4. Copy and paste the SQL above
5. Click **Run**

## What This Does

✅ Creates a secure `user_roles` table separate from profiles
✅ Implements proper Row Level Security policies
✅ Prevents privilege escalation attacks
✅ Automatically assigns 'customer' role to new signups
✅ Allows users to have multiple roles (admin can also be a chef, etc.)
✅ Uses security definer functions to prevent RLS recursion issues

## Assigning Admin Role

To make a user an admin, run this SQL (replace `USER_EMAIL` with the actual email):

```sql
-- Get user ID from email
SELECT id FROM auth.users WHERE email = 'USER_EMAIL';

-- Assign admin role (use the ID from above)
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_ID_HERE', 'admin');
```

## Multiple Roles

Users can have multiple roles. For example, to make someone both an admin and a chef:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES 
  ('USER_ID_HERE', 'admin'),
  ('USER_ID_HERE', 'chef');
```

## Security Benefits

- **Prevents client-side manipulation**: Roles cannot be changed by users editing localStorage or session data
- **Server-side validation**: All role checks go through Supabase RLS policies
- **Audit trail**: Role assignments are tracked with timestamps
- **Flexible permissions**: Users can have multiple roles simultaneously
- **Safe from SQL injection**: Uses prepared statements and RLS

---

**⚠️ Important**: After running this migration, all new users will automatically get the 'customer' role. Existing users will need to have roles assigned manually using the SQL commands above.
