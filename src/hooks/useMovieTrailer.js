

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  // read existing trailer from store
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  const savedForMovieId = trailerVideo?.movieId;

  const getMovieVideos = async () => {
    if (!movieId) return;

    // STOP: If trailer already fetched for this movie, do NOT fetch again
    if (savedForMovieId === movieId) {
      console.log("Trailer already cached in Redux. No API call.");
      return;
    }

    console.log("Fetching trailer for:", movieId);

    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
    );

    const json = await data.json();
    const videos = json?.results || [];

    const trailer =
      videos.find((v) => v.type === "Trailer") || videos[0] || null;

    // Save BOTH trailer & movieId so we know which movie it belongs to
    dispatch(addTrailerVideo({ ...trailer, movieId }));
  };

  useEffect(() => {
    getMovieVideos();
  }, [movieId]);
};

export default useMovieTrailer;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { API_OPTIONS } from "../utils/constants";
// import { addTrailerVideo } from "../utils/moviesSlice";

// const useMovieTrailer = (movieId) => {
//   const dispatch = useDispatch();

//   const trailerVideo = useSelector((store) => store.movies.trailerVideo);
//   const savedForMovieId = trailerVideo?.movieId;

//   useEffect(() => {
//     if (!movieId) return;

//     // STOP if already cached
//     if (savedForMovieId === movieId) {
//       console.log("Trailer already cached. No API call.");
//       return;
//     }

//     const fetchTrailer = async () => {
//       console.log("Fetching trailer for:", movieId);

//       const data = await fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}/videos`,
//         API_OPTIONS
//       );

//       const json = await data.json();
//       const videos = json?.results || [];

//       const trailer =
//         videos.find((v) => v.type === "Trailer") || videos[0] || null;

//       dispatch(addTrailerVideo({ ...trailer, movieId }));
//     };

//     fetchTrailer();
//   }, [movieId, savedForMovieId, dispatch]);
// };

// export default useMovieTrailer;

