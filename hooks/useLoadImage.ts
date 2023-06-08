import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

// hook to load the image from supabase.
const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient();
  
  if (!song) {
    return null;
  }

  // data as imageData
  const { data: imageData } = supabaseClient
    .storage
    .from('images')
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
