import { useState } from "react";
import "./moviecard.css";
const Moviecard = (props) => {
  const movie = props.movie;
  const title = movie["title"];
  const poster = `${
    JSON.parse(localStorage.getItem("configData"))["images"]["secure_base_url"]
  }w500${movie["poster_path"]}`;
  const description = movie["overview"];
  const voteCount = movie["vote_count"];
  const voteAverage = movie["vote_average"];
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites"))
  );
  const sendModalData = () => {
    const modalData = {
      movie: movie,
      title: title,
      poster: poster,
      description: description,
      voteCount: voteCount,
      voteAverage: voteAverage,
    };
    props.setModalData(modalData);
    props.toggleModal(true);
  };
  const sendLoadMoreData = () => {
    props.setLoadMoreData(props.loadMore + 1);
  };
  const addToFavorites = (event) => {
    event.stopPropagation();
    if (!localStorage.getItem("favorites"))
      localStorage.setItem("favorites", JSON.stringify([]));

    let currentFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (!currentFavorites.includes(movie)) {
      currentFavorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(currentFavorites));
      setFavorites(currentFavorites);
    }
  };
  const removeFromFavorites = (event) => {
    event.stopPropagation();
    let currentFavorites = JSON.parse(localStorage.getItem("favorites"));
    currentFavorites = currentFavorites.filter((movieInQuestion) => {
      return movieInQuestion["id"] !== movie["id"];
    });
    localStorage.setItem("favorites", JSON.stringify(currentFavorites));
    setFavorites(currentFavorites);
  };
  const favoritesHasMovie = () => {
    let currentFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (currentFavorites) {
      for (let i = 0; i < currentFavorites.length; i++) {
        if (currentFavorites[i]["id"] === movie["id"]) return true;
      }
    }
    return false;
  };
  return (
    <div
      className={movie["title"] ? "Moviecard" : "LoadMoreCard"}
      onClick={movie["title"] ? sendModalData : sendLoadMoreData}
    >
      {movie["title"] ? (
        <>
          <img  src={poster} alt={require('../res/notfound.png')}/>
          <div className="Overlay">
            <h2>{title}</h2>
            <div
              className="OverLayFavorites"
              onClick={
                favoritesHasMovie() ? removeFromFavorites : addToFavorites
              }
            >
              <h3>{favoritesHasMovie() ? "Unfavorite" : "Favorite"}</h3>
            </div>

            <div className="VoteDisplay">
              <div className="VoteAverage">{voteAverage}</div>
              <div className="Votecount">{voteCount}</div>
            </div>

            <p className="Description">{description}</p>
          </div>
        </>
      ) : (
        <>
          <h1>+</h1>
          <h2>Load More</h2>
        </>
      )}
    </div>
  );
};

export default Moviecard;
