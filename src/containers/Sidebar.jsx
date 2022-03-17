import "./sidebar.css";
import Genre from "../components/Genre";
import { useEffect, useState } from "react";
const Sidebar = (props) => {
  const movieListApiKey = `https://api.themoviedb.org/3/genre/movie/list?api_key=${props.apiKey}&language=en-US`;
  const [updateAfterRequest, setUpdateAfterRequest] = useState(null);
  useEffect(() => {
    if (!sessionStorage.getItem("movieGenreObject")) {
      fetch(movieListApiKey)
        .then((response) => response.json())
        .then((result) => {
          sessionStorage.setItem("movieGenreObject", JSON.stringify(result));
          setUpdateAfterRequest(true);
        });
    }
  }, []);
  return (
    <div className="Sidebar">
      <div className="Header">
        <h2>
          Kiwi <span>Films</span>
        </h2>
        <img src="" alt="" />
      </div>
      <div className="genreDisplay">
        <ul>
          {sessionStorage.getItem("movieGenreObject")
            ? JSON.parse(sessionStorage.getItem("movieGenreObject"))[
                "genres"
              ].map((genre) => {
                return (
                  <Genre
                    getGenreData={props.getGenreData}
                    name={genre["name"]}
                    genreKey={genre["id"]}
                    key={genre["id"]}
                  />
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
