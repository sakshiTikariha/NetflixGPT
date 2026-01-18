
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import Header from  './header';
import MainContainer from "./MainContainer";
import SecondaryContainer from "./secondaryContainer";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";


const Browser = () => {
  const showGptSearch=useSelector(store=>store.gpt.showGptSearch)
   useNowPlayingMovies();
 
  return (
    <div>
      <Header />

      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browser;


  


