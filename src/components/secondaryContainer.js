
 import MovieList from './MovieList';
import { useSelector } from 'react-redux';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';
const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
   usePopularMovies();
   useTopRatedMovies();
   useUpcomingMovies();
   useTrendingMovies("week");
 return (
  <div className="bg-black">
    {/* <div className="relative z-20 mt-[-80px] px-4 space-y-6"> */}
    <div className="relative z-20 px-4 sm:px-6 md:px-8 py-6 space-y-6">
      {movies?.nowPlayingMovies && (
        <MovieList
          title="Now Playing"
          movies={movies.nowPlayingMovies}
          rowClass="flex space-x-4 overflow-x-auto py-2"
          cardClass="min-w-[150px] md:min-w-[200px] lg:min-w-[250px] cursor-pointer transition transform hover:scale-105"
        />
      )}

     {movies?.topRatedMovies && (
  <MovieList
    title="Top Rated"
    movies={movies.topRatedMovies}
    rowClass="flex space-x-4 overflow-x-auto py-2"
    cardClass="min-w-[150px] md:min-w-[200px] lg:min-w-[250px] cursor-pointer transition transform hover:scale-105"
  />
)}


      {movies?.upcomingMovies && (
        <MovieList
          title="Upcoming"
          movies={movies.upcomingMovies}
          rowClass="flex space-x-4 overflow-x-auto py-2"
          cardClass="min-w-[150px] md:min-w-[200px] lg:min-w-[250px] cursor-pointer transition transform hover:scale-105"
        />
      )}
      {movies?.trendingMovies && (
        <MovieList
          title="Trending"
          movies={movies.trendingMovies}
          rowClass="flex space-x-4 overflow-x-auto py-2"
          cardClass="min-w-[150px] md:min-w-[200px] lg:min-w-[250px] cursor-pointer transition transform hover:scale-105"
        />
      )}
      {movies?.popularMovies && (
          <MovieList
            title="Popular"
            movies={movies.popularMovies}
            rowClass="flex space-x-4 overflow-x-auto py-2"
            cardClass="min-w-[150px] md:min-w-[200px] lg:min-w-[250px] cursor-pointer transition transform hover:scale-105"
          />
        )}

    </div>
  </div>
);

};

export default SecondaryContainer;
