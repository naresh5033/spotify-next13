import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

// fetch the song with url/path from supabase
const useLoadSongUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient(); //if we want we can exttract from the usercontext
  // const {superbaseClient } = useSessionContext(); 

  if (!song) {
    return '';
  }

  const { data: songData } = supabaseClient
  .storage
  .from('songs')
  .getPublicUrl(song.song_path);

  return songData.publicUrl;
};

export default useLoadSongUrl;
