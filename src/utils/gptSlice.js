import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch:false,
    movieNames:null,
    movieResults:null,
     isLoading: false,
  },
  reducers:{
   toogleGptSearchView:(state)=>{
    state.showGptSearch=!state.showGptSearch
   },
   setLoading: (state, action) => {
    state.isLoading = action.payload;
  },
   addGptMoviesResult:(state,action)=>{
    const {movieNames,movieResults}=action.payload;
    state.movieNames=movieNames;
     state.movieResults=movieResults;
      state.isLoading = false;
   },
  },
  });
 export const {toogleGptSearchView,setLoading, addGptMoviesResult}=gptSlice.actions;
  export default gptSlice.reducer;