
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  // Read cached movie from Redux
  const upcomingMovies = useSelector(
    (store) => store.movies.upcomingMovies
  );

  const getUpcomingMovies = async () => {
    //  Prevent refetching if data alrdy exists
    if (upcomingMovies) {
      console.log("Upcoming movies already in store — skipping fetch.");
      return;
    }

    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        API_OPTIONS
      );

      const data = await response.json();
      console.log("Upcoming Movies:", data.results);

      dispatch(addUpcomingMovies(data.results));
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
    }
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
