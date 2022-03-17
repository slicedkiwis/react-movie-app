import "./favoritemoviecard.css";
const FavoriteMoviecard = (props) => {
  const movie = props.movie;
  const sendModalData = () => {
    const modalData = {
      movie: movie,
      title: movie["title"],
      poster: `${
        JSON.parse(localStorage.getItem("configData"))["images"][
          "secure_base_url"
        ]
      }w500${movie["poster_path"]}`,
      description: movie["overview"],
      voteCount: movie["vote_count"],
      voteAverage: movie["vote_average"],
    };
    props.setModalData(modalData);
    props.toggleModal(true);
  };
  const removeFromFavorites = (event) => {
    event.stopPropagation();
    let currentFavorites = JSON.parse(localStorage.getItem("favorites"));
    currentFavorites = currentFavorites.filter((movieInQuestion) => {
      return movieInQuestion["id"] !== movie["id"];
    });
    localStorage.setItem("favorites", JSON.stringify(currentFavorites));
  };

  return (
    <div className="Moviecard" onClick={sendModalData}>
      <img
        src={`http://image.tmdb.org/t/p/w500${["poster_path"]}`}
        alt=""
      />
      <div className="Overlay">
        <h2>{movie["title"]}</h2>

        <div
          className="FavoriteMoviecardOverlayFavorites"
          onClick={(event) => {
            removeFromFavorites(event);
            props.setCurrentFavorites(
              JSON.parse(localStorage.getItem("favorites"))
            );
          }}
        >
          <h3>{"Unfavorite"}</h3>
        </div>

        <div className="VoteDisplay">
          <div className="VoteAverage">{movie["vote_average"]}</div>
          <div className="Votecount">{movie["vote_count"]}</div>
        </div>
        <p className="Description">{movie["overview"]}</p>
      </div>
    </div>
  );
};

export default FavoriteMoviecard;
