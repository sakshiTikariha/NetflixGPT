
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { lang } from "../components/LanguageChage";

// import { RiSearchLine, RiMicLine, RiCloseLine } from "react-icons/ri";

// const GptSearchBar = () => {
//   const selectedLanguage = useSelector((store) => store.lang.language);
//         const [query, setQuery] = useState("");

//   return (
//     <div className="pt-28 px-10 text-white bg-black min-h-screen">

//       {/* Search Bar */}
//       <form className="flex justify-center "
//        onSubmit ={(e)=>e.preventDefault()}>
//         <div className="bg-[#1A1A1A] w-full max-w-4xl rounded-xl flex items-center px-5 py-4 shadow-lg">

//           <RiSearchLine className="text-gray-400 text-2xl mr-3" />

//             <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}  // 🔥 captures typing
//           placeholder={lang[selectedLanguage]?.gptSearchPlaceHolder}
//           className="bg-transparent text-xl w-full outline-none"
//         />

//           <button className="text-gray-400 hover:text-white">
//             <RiMicLine className="text-2xl" />
//           </button>

          
//              <button
//                type="button"
//               onClick={() => setQuery("")}  // 🔥 clear text
//            className="text-gray-400 hover:text-white ml-6"
//               >
//             <RiCloseLine className="text-3xl" />
//           </button>

//         </div>
//       </form>

//     </div>
//   );
// };

// export default GptSearchBar;

// import { useRef } from "react";
// import { useSelector,useDispatch } from "react-redux";
// import { lang } from "../components/LanguageChage";
// import openai from "../components/openai";

// import { RiSearchLine, RiMicLine, RiCloseLine } from "react-icons/ri";
// import { addGptMoviesResult } from "../utils/gptSlice";
// import { API_OPTIONS } from "../utils/constants";

// const GptSearchBar = () => {
//   const dispatch=useDispatch();
//   const selectedLanguage = useSelector((store) => store.lang.language);

//   const searchRef = useRef(null); // 🔥 replaces useState
//    const searchMoviesTMDB=async(movie)=>{
//     const data=await fetch(
//       "https://api.themoviedb.org/3/search/movie?query="+{movie}
//       +"&include_adult=false&language=en-US&page=1",API_OPTIONS);
//       const json= await data.json();
//       return json.results;
//    }
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   const query = searchRef.current.value.trim();
//   if (!query) return;

//   console.log("Searching for:", query);

//   const gptQuery =
//     "Act as a Movie Recommendation System and suggest some movies for the query: " +
//     query +
//     ". Only give me the top 20 movies, comma separated like this example: sadar, sholay, don, golmaal, koi mil gaya"+
//     "also recommemdation should be from hindi ,english,french,korean  5 from each genre";

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini", 
//       messages: [{ role: "user", content: gptQuery }],
//       max_tokens: 100,
//     });

//      const gptMovie=response.choices[0].message.content.split(",");
//      const promiseArray=gptMovie.map((movie)=>searchMoviesTMDB(movie));
//      const tmdbResult=await Promise.all(promiseArray);
//      console.log(tmdbResult);
//      dispatch(addGptMoviesResult(tmdbResult));
//   } catch (error) {
//     console.error("GPT API Error:", error);
//   }
// };
//   const clearInput = () => {
//     if (searchRef.current) {
//       searchRef.current.value = ""; // 🔥 clears without re-render
//     }
//   };

//   return (
//     <div className="pt-28 px-10 text-white bg-black min-h-screen">

//       <form className="flex justify-center"
//             onSubmit={handleSubmit}>  {/* ENTER triggers search */}

//         <div className="bg-[#1A1A1A] w-full max-w-4xl rounded-xl flex items-center px-5 py-4 shadow-lg">

//           <RiSearchLine className="text-gray-400 text-2xl mr-3" />

//           <input
//             type="text"
//             ref={searchRef}  // 🔥 instead of value + setState
//             placeholder={lang[selectedLanguage]?.gptSearchPlaceHolder}
//             className="bg-transparent text-xl w-full outline-none"
//           />

//           <button type="button" className="text-gray-400 hover:text-white">
//             <RiMicLine className="text-2xl" />
//           </button>

//           <button
//             type="button"
//             onClick={clearInput}                     // 🔥 clear button
//             className="text-gray-400 hover:text-white ml-6"
//           >
//             <RiCloseLine className="text-3xl" />
//           </button>

//         </div>
//       </form>

//     </div>
//   );
// };

// export default GptSearchBar;

import { useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { lang } from "../components/LanguageChage";
import openai from "../components/openai";

import { RiSearchLine, RiMicLine, RiCloseLine } from "react-icons/ri";
import { addGptMoviesResult ,setLoading} from "../utils/gptSlice";
import { API_OPTIONS } from "../utils/constants";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((store) => store.lang.language);

  const searchRef = useRef(null);

  const searchMoviesTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie) +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();        
    return json.results;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = searchRef.current.value.trim();
    if (!query) return;
     dispatch(setLoading(true)); 
    const gptQuery =
      "Act as a Movie Recommendation System and suggest 15- 20 movies for the query: " +
      query +
       ". The list must include movies from Hollywood, Bollywood ,kmovies,Cmovies, and World Cinema — all mixed together. Ensure at least 40% of the movies are from Indian cinema. Give output as comma-separated titles only.";

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: gptQuery }],
        max_tokens: 100,
      });

      const raw = response.choices[0].message.content;

// remove unwanted text like "Here are some movies"
     const cleaned = raw
  .replace(/[\n\r]/g, ",")      // make newlines into commas
  .replace(/[^a-zA-Z0-9, ]/g, "") // remove dots and special chars
  .replace(/movies?/gi, "")       // remove "movies" word
  .replace(/here are/gi, "")      // remove "here are"
  .trim();

        const gptMovie = cleaned
       .split(",")
      .map((m) => m.trim())
      .filter((m) => m.length);

      const promiseArray = gptMovie.map((movie) =>
        searchMoviesTMDB(movie)
      );
      const tmdbResult = await Promise.all(promiseArray);

// 🧹 Remove movies that have no poster
const cleanedResults = tmdbResult.map(list =>
  list.filter(movie => movie.poster_path !== null)
);


dispatch(
  addGptMoviesResult({
    movieNames: gptMovie,
    movieResults: cleanedResults,
  })
);}  catch (error) {
    console.error("GPT API Error:", error);
  } finally {
    dispatch(setLoading(false)); // ✅ Stop loading no matter what
  }
  };

  const clearInput = () => {
    if (searchRef.current) {
      searchRef.current.value = "";
    }
  };
  dispatch(setLoading(false));

  return (
    <div className="pt-28 px-10 text-white ">
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <div className="bg-[#1A1A1A] w-full max-w-4xl rounded-xl flex items-center px-5 py-4 shadow-lg">
          <RiSearchLine className="text-gray-400 text-2xl mr-3" />

          <input
            type="text"
            ref={searchRef}
            placeholder={lang[selectedLanguage]?.gptSearchPlaceHolder}
            className="bg-transparent text-xl w-full outline-none"
          />

          <button type="button" className="text-gray-400 hover:text-white">
            <RiMicLine className="text-2xl" />
          </button>

          <button
            type="button"
            onClick={clearInput}
            className="text-gray-400 hover:text-white ml-6"
          >
            <RiCloseLine className="text-3xl" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default GptSearchBar;

