import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

//pull the song from db into our server.
const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies //from /next/headers
  });

  //fetch songs from db
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongs; //lets use this in our page component
