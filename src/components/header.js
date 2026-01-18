

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
        dispatch(addUser({ uid, email, displayName, photoURL }));
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
  };

  return (
    <div className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-3 gap-3">
        
        {/* Logo */}
        <img src={Logo} alt="Netflix Logo" className="h-10 sm:h-12 w-auto" />

        {user?.uid && (
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Language Dropdown */}
            <select
              onChange={handleLanguageChange}
              className="bg-black/70 text-white border border-gray-500 px-3 py-1.5 rounded-md text-sm sm:text-base cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>

            {/* GPT Toggle Button */}
            <button
              onClick={handleGptSearchClick}
              className="py-1.5 px-3 sm:px-4 bg-purple-800 text-white rounded-lg text-xs sm:text-sm"
            >
              {showGptSearch ? "Home Page" : "GPT Search"}
            </button>

            {/* User Avatar Dropdown */}
            <div className="relative">
              <img
                src={
                  user.photoURL ||
                  "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                }
                alt="User avatar"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
              />

              {open && (
                <div className="absolute right-0 mt-2 bg-black/90 text-white w-32 sm:w-36 rounded shadow-lg py-2">
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-800 text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;




