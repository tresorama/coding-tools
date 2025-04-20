import type { Result } from "@/lib/utils/ts-result";

export const convertYoutubeUrl = (url: string): Result<{ youtube_url: string; }> => {
  // Output is always
  // https://www.youtube.com/watch?v=VIDEO_ID

  let video_id: null | string = null;

  if (url.includes('youtu.be')) {
    // https://youtu.be/MhfyvQihMa8?si=VVJJ8hM2yoGK64FK
    video_id = url.split('youtu.be/')[1].split('?')[0];
  }
  else if (url.includes('watch?v=')) {
    // https://www.youtube.com/watch?v=IYC5l5iTiDo&t=29s
    video_id = url.split('watch?v=')[1].split('&')[0];
  }

  if (video_id) {
    return {
      status: 'success',
      data: {
        youtube_url: `https://www.youtube.com/watch?v=${video_id}`,
      }
    };
  }

  return {
    status: 'error',
    message: 'unrecognized url structure.'
  };
};