import React from 'react'
import { AiFillPlayCircle, AiOutlineInfoCircle } from "react-icons/ai";

const VideoTitle = ({ title, overview,id }) => {
 return (
  <div className="relative w-screen h-screen overflow-hidden">

  {/* Background Video */}
  <div className="w-screen aspect-video">
    <video
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      src={id}
    />
  </div>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r 
                  from-black via-black/40 to-transparent" />

  {/* CENTERED TEXT BLOCK */}
  <div className="
      absolute 
      top-1/2 left-12 
      -translate-y-1/2     /* CENTER VERTICALLY */
      max-w-2xl 
      text-white 
      drop-shadow-xl
    "
  >
    <h1 className="text-6xl font-extrabold leading-tight">
      {title}
    </h1>

    <p className="py-6 text-lg opacity-90 leading-relaxed">
      {overview}
    </p>

    <div className="flex gap-4 mt-4">

      {/* Play Button */}
       <button
          className="bg-white text-black font-semibold py-3 px-10 text-xl rounded-md 
                     hover:bg-opacity-80 transition flex items-center gap-3
                     focus:outline-none focus:ring-0"
        >
          <AiFillPlayCircle size={30} />
          Play
        </button>

        {/* More Info Button */}
        <button
          className="bg-gray-500 bg-opacity-50 text-white font-semibold py-3 px-10 text-xl 
                     hover:bg-opacity-30 transition flex items-center gap-3
                     focus:outline-none focus:ring-0"
        >
          <AiOutlineInfoCircle size={28} />
          More Info
        </button>


    </div>
  </div>

</div>
 );
};

export default VideoTitle;


