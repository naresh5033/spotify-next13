import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// we wana fetch the liked songs fron the currently logged in user
const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase 
    .from('liked_songs')
    .select('*, songs(*)') // the liked songs table has relation with songs, so we wanna fetch the entire song.
    .eq('user_id', session?.user?.id)
    .order('created_at', { ascending: false })

  if (!data) return [];

  return data.map((item) => ({
    ...item.songs //we re actually spreading the relation that populated with the one song that'll be loading
  }))
};

export default getLikedSongs;
