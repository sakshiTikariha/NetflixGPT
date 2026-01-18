

import { useState, useRef } from "react";
import Header from "./header";
import { validData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { User_img } from "../utils/constants";

const Login = () => {
  const [info, setInfo] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const HandleButton = () => {
    const mess = validData(email.current.value, password.current.value);
    setError(mess);
    if (mess) return;

    // ---------------- SIGN UP ----------------
   if (!info) {
  let createdUser = null;

  createUserWithEmailAndPassword(
    auth,
    email.current.value,
    password.current.value
  )
    .then((userCredential) => {
      createdUser = userCredential.user;

      return updateProfile(createdUser, {
        displayName: name.current.value,
        photoURL: User_img
      
      });
    })
    .then(() => {
      const { uid, email, displayName, photoURL } = auth.currentUser;

      dispatch(
        addUser({
          uid,
          email,
          displayName,
          photoURL,
        })
      );

      navigate("/browser");
    })
    .catch((error) => {
      setError(error.code + " - " + error.message);
    });
}


    // ---------------- SIGN IN ----------------
    else {
  signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
  )
    .then(async (userCredential) => {
      // RELOAD USER TO GET LATEST photoURL + displayName
      await auth.currentUser.reload();

      navigate('/browser')
    })
    .catch((error) => {
      setError(error.code + " - " + error.message);
    });
    }
  }

  const toggleInfo = () => setInfo(!info);

  return (
    <div
      className="main text-white"
      style={{
        backgroundImage: "url('/hero image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="bg-black bg-opacity-40 min-h-screen">
      <Header />

        <div className="relative flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={(e) => e.preventDefault()}
            className="bg-black bg-opacity-60 px-12 py-10 rounded-md max-w-md w-full"
      >
            <h1 className="text-3xl font-semibold mb-6">
              {info ? "Sign In" : "Sign Up"}
        </h1>

            <div className="flex flex-col space-y-4">
              {!info && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
                  className="p-3 rounded bg-[#333] text-white focus:outline-none"
          />
        )}

        <input
          ref={email}
          type="email"
                placeholder="Email or Phone Number"
                className="p-3 rounded bg-[#333] text-white focus:outline-none"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
                className="p-3 rounded bg-[#333] text-white focus:outline-none"
        />

              <p className="error text-red-700">{error}</p>

        <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 py-3 rounded font-semibold mt-4"
                onClick={HandleButton}
        >
                {info ? "Sign In" : "Sign Up"}
        </button>
            </div>

            <div
              className="text-gray-400 mt-8 text-sm cursor-pointer hover:underline"
              onClick={toggleInfo}
            >
              {info ? "New User? Sign Up" : "Already a user? Sign In"}
            </div>
      </form>
    </div>
      </div>
    </div>
  );
};

export default Login

