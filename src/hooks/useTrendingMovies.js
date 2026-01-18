import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrendingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useTrendingMovies = (timeWindow = "week") => { // "day" or "week"
  const dispatch = useDispatch();

  // Read from Redux store
  const trendingMovies = useSelector(
    (store) => store.movies.trendingMovies
  );

  const getTrendingMovies = async () => {
    // If already fetched → don’t fetch again
    if (trendingMovies) {
      console.log("Trending movies already cached — skipping fetch.");
      return;
    }

    try {
      console.log("Fetching trending movies...");

      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/${timeWindow}`,API_OPTIONS
      );

      const data = await response.json();

      console.log("Trending Movies:", data.results);

      dispatch(addTrendingMovies(data.results));
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
    }
  };

  useEffect(() => {
    getTrendingMovies();
  }, [timeWindow]);
};

export default useTrendingMovies;

