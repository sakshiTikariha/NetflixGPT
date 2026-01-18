
import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return null;

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative w-full h-[60vh] sm:h-[75vh] lg:h-[90vh] overflow-hidden">

      {/* Background Video */}
      <VideoBackground movieId={id} />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-end sm:items-center px-4 sm:px-10 lg:px-16 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <VideoTitle title={original_title} overview={overview} />
      </div>
    </div>
  );
};

export default MainContainer;