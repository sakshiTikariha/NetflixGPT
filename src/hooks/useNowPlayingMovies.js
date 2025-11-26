// import {useEffect} from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { addNowPlayingMovies } from '../utils/moviesSlice';
// import { API_OPTIONS } from '../utils/constants';

// const useNowPlayingMovies = () => {
//   const dispatch=useDispatch();
//   const nowPlayingMovies=useSelector((store)=>store.movies.nowPlayingMovies);
//   const getNowPlayingMovies=async()=>{
//    const data=await fetch(
//         "https://api.themoviedb.org/3/movie/now_playing?page=1"
//         ,API_OPTIONS
//       );
//        const json=await data.json();
//        console.log(json);
//        dispatch(addNowPlayingMovies(json.results));
//     };
//      useEffect(()=>{
//       !nowPlayingMovies && getNowPlayingMovies();
//      },[]);
// };

// export default useNowPlayingMovies;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  // Read from Redux
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getNowPlayingMovies = async () => {
    if (nowPlayingMovies) {
      console.log("Now Playing movies are already cached. No API call.");
      return;
    }

    console.log("Fetching Now Playing movies...");

    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );

    const json = await data.json();

    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
