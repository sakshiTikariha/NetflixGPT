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
    <div className="px-10 mt-6">
      <h2 className="text-white text-2xl font-semibold mb-4">AI Recommendations</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="text-center">
            <img
              className="rounded-lg w-full h-48 object-cover"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p className="text-white mt-2">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
