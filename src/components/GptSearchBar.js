
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { lang } from "../components/LanguageChage";
import openai from "../components/openai";

import { RiSearchLine, RiMicLine, RiCloseLine } from "react-icons/ri";
import { addGptMoviesResult, setLoading } from "../utils/gptSlice";
import { API_OPTIONS } from "../utils/constants";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((store) => store.lang.language);
  const searchRef = useRef(null);

  const searchMoviesTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        movie
      )}&include_adult=false&language=en-US&page=1`,
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
      "Act as a Movie Recommendation System and suggest 15-20 movies for the query: " +
      query +
      ". The list must include movies from Hollywood, Bollywood, K-movies, C-movies, and World Cinema — all mixed together. Ensure at least 40% of the movies are from Indian cinema. Give output as comma-separated titles only.";

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: gptQuery }],
        max_tokens: 100,
      });

      const raw = response.choices[0].message.content;

      const cleaned = raw
        .replace(/[\n\r]/g, ",")
        .replace(/[^a-zA-Z0-9, ]/g, "")
        .replace(/movies?/gi, "")
        .replace(/here are/gi, "")
        .trim();

      const gptMovie = cleaned
        .split(",")
        .map((m) => m.trim())
        .filter((m) => m.length);

      const promiseArray = gptMovie.map((movie) => searchMoviesTMDB(movie));
      const tmdbResult = await Promise.all(promiseArray);

      const cleanedResults = tmdbResult.map((list) =>
        list.filter((movie) => movie.poster_path !== null)
      );

      dispatch(
        addGptMoviesResult({
          movieNames: gptMovie,
          movieResults: cleanedResults,
        })
      );
    } catch (error) {
      console.error("GPT API Error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const clearInput = () => {
    if (searchRef.current) searchRef.current.value = "";
  };

  return (
    <div className="pt-24 px-4 sm:px-6 md:px-10 text-white">
      <form
        className="flex justify-center"
        onSubmit={handleSubmit}
      >
        <div className="bg-[#1A1A1A] w-full max-w-xl sm:max-w-2xl md:max-w-4xl rounded-xl flex items-center px-4 sm:px-5 py-3 sm:py-4 shadow-lg gap-2 sm:gap-3">
          {/* Search Icon */}
          <RiSearchLine className="text-gray-400 text-xl sm:text-2xl flex-shrink-0" />

          {/* Input Field */}
          <input
            type="text"
            ref={searchRef}
            placeholder={lang[selectedLanguage]?.gptSearchPlaceHolder}
            className="bg-transparent text-base sm:text-xl w-full outline-none"
          />

          {/* Mic and Clear Buttons */}
          <button
            type="button"
            className="text-gray-400 hover:text-white flex-shrink-0"
          >
            <RiMicLine className="text-xl sm:text-2xl" />
          </button>

          <button
            type="button"
            onClick={clearInput}
            className="text-gray-400 hover:text-white flex-shrink-0"
          >
            <RiCloseLine className="text-2xl sm:text-3xl" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default GptSearchBar;
