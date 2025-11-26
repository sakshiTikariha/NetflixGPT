import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  // read cached data from Redux
  const topRatedMovies = useSelector(
    (store) => store.movies.topRatedMovies
  );

  const getTopRatedMovies = async () => {
    // avoid re-fetching if already available
    if (topRatedMovies) {
      console.log("Top rated movies already cached — skipping fetch.");
      return;
    }

    console.log("Fetching top rated movies...");

    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;


// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addTopRatedMovies } from "../utils/moviesSlice";
// import { API_OPTIONS } from "../utils/constants";

// const useTopRatedMovies = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const getTopRatedMovies = async () => {
//       const data = await fetch(
//         "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
//         API_OPTIONS
//       );
//       const json = await data.json();
//       dispatch(addTopRatedMovies(json.results));
//     };

//     getTopRatedMovies();
//   }, [dispatch]);
// };

// export default useTopRatedMovies;

