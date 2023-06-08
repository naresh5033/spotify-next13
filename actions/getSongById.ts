import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

// sim as the get songs.
const getSongById = async (id: string): Promise<Song> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  // lets pull the data from the songs table, with id
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongById; //we gon put this fn in layout
