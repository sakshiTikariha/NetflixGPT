
// import useMovieTrailer from "../hooks/useMovieTrailer";


// const VideoBackground = ({ movieId }) => {
//     useMovieTrailer(movieId)
//   return (
//     <div>
//       <iframe
//         src={
//           trailerVideo?.key
//             ? `https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1`
//             : ""
//         }
//         title="YouTube video player"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//       ></iframe>
//     </div>
//   );
// };

// export default VideoBackground;

import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer.js";

const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId);

  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-black">
      <iframe
        className="absolute top-1/2 left-1/2 min-w-full min-h-full transform -translate-x-1/2 -translate-y-1/2 scale-[1.6]"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
    </div>
  );
};

export default VideoBackground;