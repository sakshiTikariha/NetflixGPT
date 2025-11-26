
import { useState, useEffect } from "react";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { Logo, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toogleGptSearchView } from "../utils/gptSlice";
import { setLanguage } from "../utils/langSlice";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const { uid, email, displayName, photoURL } = firebaseUser;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClick = () => {
    dispatch(toogleGptSearchView());
  };
    const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value));
    }

  return (
    <div
      className="
        absolute top-0 left-0 w-full 
        px-8 py-4 
        z-50 
        bg-gradient-to-b from-black/70 to-transparent 
        flex justify-between items-center
      "
    >
      <img src={Logo} alt="Netflix Logo" className="h-12" />

      {user?.uid && (
        <div className="flex items-center space-x-4">
          <select
          onChange={handleLanguageChange}
        className="bg-black/70 text-white border border-gray-500 px-4 py-2 rounded-md 
             hover:border-white focus:border-white transition-all duration-200
             cursor-pointer outline-none">
         {SUPPORTED_LANGUAGES.map((lang)=>(
         <option key={lang.identifier} value={lang.identifier}>
          {lang.name}
          </option>
         ))}
          </select>
          {/* GPT Search Button */}
          <button
          onClick={handleGptSearchClick}
           className="py-2 px-4 bg-purple-800 text-white rounded-lg"
          >
           {showGptSearch ? "Home Page" : "GPT Search"}
          </button>

          {/* Avatar */}
          <div className="relative">
            <img
              src={
                user.photoURL ||
                "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              }
              alt="User avatar"
              className="h-10 w-10 rounded cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            />

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute right-0 mt-3 bg-black/90 text-white w-36 rounded shadow-lg py-2">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;



