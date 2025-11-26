// import {useEffect} from 'react'
// import { useDispatch } from 'react-redux';
// import { addPopularMovies } from '../utils/moviesSlice';
// import { API_OPTIONS } from '../utils/constants';

// const usePopularMovies = () => {
//   const dispatch=useDispatch();
//   const getPopularMovies=async()=>{
//    const data=await fetch(
//         "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
//         ,API_OPTIONS
//       );
//        const json=await data.json();
//        console.log(json);
//        dispatch(addPopularMovies(json.results));
//     };
//      useEffect(()=>{
//       getPopularMovies();
//      },[dispatch]);
// };

// export default usePopularMovies;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  // Read existing cached data from Redux
  const popularMovies = useSelector(
    (store) => store.movies.popularMovies
  );

  const getPopularMovies = async () => {
    if (popularMovies) {
      console.log("Popular movies already cached — no API call.");
      return;
    }

    console.log("Fetching popular movies...");

    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;

