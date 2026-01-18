
import React from "react";
import { useSelector } from "react-redux";

const Loader = () => (
  <div className="flex justify-center items-center py-10">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
  </div>
);

const GptMovieSuggestion = () => {
  const { movieResults, isLoading } = useSelector((store) => store.gpt);

  if (isLoading) return <Loader />;
  if (!movieResults) return null;

  const movies = movieResults.flat();

  return (
    <div className="px-4 sm:px-6 md:px-10 mt-6">
      <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
        AI Recommendations
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="text-center">
            <img
              className="rounded-lg w-full h-40 sm:h-44 md:h-48 lg:h-52 object-cover"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p className="text-white mt-2 text-xs sm:text-sm md:text-base truncate">
              {movie.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
