import "./App.css";
import Layout from "./containers/Layout";
import Sidebar from "./containers/Sidebar";
import Main from "./containers/Main";
import { useEffect, useState } from "react";
function App() {
  const apiKey = "638b33e40e73702eec3c27336ac7870e";
  const [movies, setMovies] = useState(null);
  const [genreData, setGenreData] = useState([null, null]);
  useEffect(() => {
    const popularMovieListApiKey = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    const posterSizeConfigDataApiKey = `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`;
    if (!sessionStorage.getItem("popular")) {
      fetch(popularMovieListApiKey)
        .then((response) => response.json())
        .then((result) => {
          sessionStorage.setItem("popular", JSON.stringify(result));
          setMovies(result);
        });
    }
    if (!sessionStorage.getItem("configData")) {
      fetch(posterSizeConfigDataApiKey)
        .then((response) => response.json())
        .then((result) => {
          sessionStorage.setItem("configData", JSON.stringify(result));
        });
    }
  });
  return (
    <div className="App">
      <Layout>
        <Sidebar getGenreData={setGenreData} apiKey={apiKey} />
        <Main
          movies={movies}
          genreId={genreData[0]}
          genreName={genreData[1]}
          apiKey={apiKey}
        />
      </Layout>
    </div>
  );
}

export default App;
