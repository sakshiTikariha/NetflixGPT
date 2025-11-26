export const Logo= "/Netflix_2015_logo.svg";
export const User_img ="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";
export const API_OPTIONS= {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_KEY}`,
  },
};
console.log("TMDB Token:", process.env.REACT_APP_TMDB_APP);
export const IMG_CDN_URL="https://image.tmdb.org/t/p/w500/";

export const SUPPORTED_LANGUAGES=[{identifier:"en",name:"English"},{identifier:"hindi",name:"Hindi"},
  {identifier:"korean",name:"Korean"},{identifier:"french",name:"French"}];

export const OPENAPI_KEY=process.env.REACT_APP_OPENAI_KEY;