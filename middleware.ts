import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

// the middleware fn to load the songs propterly
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  return res;
};

// we  didn't ve any restrictions for the auth user to load the songs, but this way even if we change that it will work with the auth users 