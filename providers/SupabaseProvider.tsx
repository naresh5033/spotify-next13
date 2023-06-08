"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { Database } from "@/types_db";

interface SupabaseProviderProps {
  children: React.ReactNode;
};

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  children
}) => {
    const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>() // now our supabase client has all of our DB
  );

  return ( 
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}
 
export default SupabaseProvider; // wrap our sidebar with our supabase client
