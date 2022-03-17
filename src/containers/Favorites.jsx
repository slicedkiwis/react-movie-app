import { useState } from "react";
import FavoriteMoviecard from "../components/FavoriteMoviecard";
import "./favorites.css";
const Favorites = (props) => {
  const [currentFavorites, setCurrentFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites"))
  );
  return (
    <div className="FavoritesPage">
      <div className="Container">
        {currentFavorites
          ? currentFavorites.map((movie) => {
              return (
                <FavoriteMoviecard
                  setModalData={props.setModalData}
                  toggleModal={props.toggleModal}
                  movie={movie}
                  key={movie["id"]}
                  setCurrentFavorites={setCurrentFavorites}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Favorites;
