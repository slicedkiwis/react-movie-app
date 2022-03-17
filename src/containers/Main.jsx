import { useEffect, useState } from "react";
import Loadingscreen from "../components/Loadingscreen";
import Modal from "../components/Modal";
import ModalMoviecard from "../components/ModalMoviecard";
import Searchbar from "../components/Searchbar";
import Moviecard from "../components/Moviecard";
import Favorites from "./Favorites";
import "./main.css";

const Main = (props) => {
  const [modalData, setModalData] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);

  const [movies, setMovies] = useState(props.movies);
  const [loadMore, setLoadMore] = useState(1);

  const [favorites, setFavorites] = useState([]);
  const [toggleFavorites, setToggleFavorites] = useState(false);

  const [toggleUpdate, setToggleUpdate] = useState(0);

  const [toggleSearchBarMovies, setSearchBarMovies] = useState(null);
  useEffect(() => {
    if (props.genreId && !sessionStorage.getItem(props.genreName)) {
      const searchByGenreApi = `https://api.themoviedb.org/3/discover/movie?api_key=${props.apiKey}&language=en-US&vote_count.gte=5&release_date.gte=2000&with_genres=${props.genreId}`;
      fetch(searchByGenreApi)
        .then((response) => response.json())
        .then((result) => {
          result["results"].push({
            title: null,
            poster: null,
            description: null,
            voteCount: null,
            voteAverage: null,
          });
          sessionStorage.setItem(props.genreName, JSON.stringify(result));
          setMovies(result);
        });
    }
    if (props.genreId && movies)
      setMovies(JSON.parse(sessionStorage.getItem(props.genreName)));
    else setMovies(JSON.parse(sessionStorage.getItem("popular")));
  }, [props.genreId, props.movies]);
  useEffect(() => {
    if (props.genreId) {
      const searchByGenreApi = `https://api.themoviedb.org/3/discover/movie?api_key=${props.apiKey}&language=en-US&vote_count.gte=5&release_date.gte=2000&with_genres=${props.genreId}&page=${loadMore}`;
      fetch(searchByGenreApi)
        .then((response) => response.json())
        .then((result) => {
          let oldMovieList = movies["results"];
          oldMovieList.pop();

          let newMovieList = oldMovieList.concat(result["results"]);
          newMovieList.push({
            title: null,
            poster: null,
            description: null,
            voteCount: null,
            voteAverage: null,
          });
          let oldMovieObject = JSON.parse(
            sessionStorage.getItem(props.genreName)
          );
          oldMovieObject["results"] = newMovieList;

          sessionStorage.setItem(
            props.genreName,
            JSON.stringify(oldMovieObject)
          );
          setMovies(oldMovieObject);
        });
    }
  }, [loadMore]);
  return (
    <div className="Main">
      <div className="Header">
        <div className="Container">
          <Searchbar
            movies={movies}
            setMainMovies={setMovies}
            apiKey={props.apiKey}
          />
        </div>
        <div
          className="Favorites"
          onClick={() => {
            setToggleFavorites(!toggleFavorites);
          }}
        >
          <h3>Favorites</h3>
        </div>
      </div>
      <div className="Content">
        {toggleFavorites ? (
          <Favorites
            toggleUpdate={toggleUpdate}
            setToggleUpdate={setToggleUpdate}
            toggleModal={setToggleModal}
            setModalData={setModalData}
          />
        ) : toggleSearchBarMovies ? (
          toggleSearchBarMovies.map((movie) => {
            return movie ? (
              <Moviecard
                movie={movie}
                setModalData={setModalData}
                toggleModal={setToggleModal}
                key={`${movie["id"]}`}
                setLoadMoreData={setLoadMore}
                loadMore={loadMore}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            ) : null;
          })
        ) : movies ? (
          movies["results"].map((movie) => {
            return movie ? (
              <Moviecard
                movie={movie}
                setModalData={setModalData}
                toggleModal={setToggleModal}
                key={`${movie["id"]}`}
                setLoadMoreData={setLoadMore}
                loadMore={loadMore}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            ) : null;
          })
        ) : (
          <Loadingscreen />
        )}
        {toggleModal ? (
          <Modal toggleModal={toggleModal} setToggleModal={setToggleModal}>
            <ModalMoviecard
              modalData={modalData}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default Main;
