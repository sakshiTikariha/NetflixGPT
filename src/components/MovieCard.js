import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, title }) => {
  if (!posterPath) return null;

  return (
    <div className="
      w-32 sm:w-36 md:w-40 lg:w-48
      flex-shrink-0 cursor-pointer
      hover:scale-105 transition-transform duration-200
    ">
      <img
        className="
          rounded-lg w-full 
          h-48 sm:h-52 md:h-56 lg:h-60 
          object-cover shadow-lg
        "
        src={IMG_CDN_URL + posterPath}
        alt={title}
      />

      <p className="text-white text-xs sm:text-sm mt-2 w-full truncate">
        {title}
      </p>
    </div>
  );
};

export default MovieCard;


