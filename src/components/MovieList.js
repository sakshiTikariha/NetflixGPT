

import { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef(null);

  if (!movies || movies.length === 0) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="px-6 py-4 w-full ">
      <h1 className="text-2xl font-semibold text-white mb-3">{title}</h1>
      
      <div className="relative ">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          &#8592;
        </button>

        {/* Scrollable container */}
        <div ref={scrollRef} className="flex gap-6 overflow-hidden">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.title || movie.original_title}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default MovieList;



