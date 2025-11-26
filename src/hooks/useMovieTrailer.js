// import { useDispatch } from "react-redux";
// import { API_OPTIONS } from "../utils/constants";
// import { addTrailerVideo } from "../utils/moviesSlice";
// import { useEffect } from "react";
// const useMovieTrailer=(movieId)=>{
//  const dispatch = useDispatch();
  

//   const getMovieVideos = async (movieId) => {
//     const data = await fetch(
//       `https://api.themoviedb.org/3/movie/${movieId}/videos`,
//       API_OPTIONS
//     );

//     const json = await data.json();
//     console.log("Video API Response:", json);

//     // ensure results exists
//     const videos = json?.results || [];

//     // filter trailer
//     const trailer =
//       videos.find((video) => video.type === "Trailer") || videos[0];

//     console.log("Selected Trailer:", trailer);

//     dispatch(addTrailerVideo(trailer));
//   };

//   useEffect(() => {
//     if (movieId) getMovieVideos();
//   }, [movieId]);
// }
// export default  useMovieTrailer;
















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
// const useMovieTrailer=()=>{
//  const dispatch = useDispatch();


//   const getMovieVideos = async (movieId) => {
//     const data = await fetch(
//       `https://api.themoviedb.org/3/movie/${movieId}/videos`,
//       API_OPTIONS
//     );

//     const json = await data.json();
//     console.log("Video API Response:", json);

//     // ensure results exists
//     const videos = json?.results || [];

//     // filter trailer
//     const trailer =
//       videos.find((video) => video.type === "Trailer") || videos[0];

//     console.log("Selected Trailer:", trailer);

//     dispatch(addTrailerVideo(trailer));
//   };

//   useEffect(() => {
//     if (movieId) getMovieVideos();
//   }, [movieId]);
// }
// export default  useMovieTrailer;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { API_OPTIONS } from "../utils/constants";
// import { addTrailerVideo } from "../utils/moviesSlice";

// const useMovieTrailer = (movieId) => {
//   const dispatch = useDispatch();
//   const trailerVideo = useSelector((store) => store.movies.trailerVideo);

//   const getMovieVideos = async () => {
//     const data = await fetch(
//       `https://api.themoviedb.org/3/movie/${movieId}/videos`,
//       API_OPTIONS
//     );
//     const json = await data.json();

//     const videos = json?.results || [];
//     const trailer =
//       videos.find((video) => video.type === "Trailer") || videos[0];

//     dispatch(addTrailerVideo(trailer));
//   };

//   useEffect(() => {
//     if (movieId) 
//        getMovieVideos();
//   }, [movieId]);

//   return trailerVideo;
// };

// export default useMovieTrailer;

