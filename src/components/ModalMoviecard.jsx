import "./modalmoviecard.css";
const ModalMoviecard = (props) => {
  const modalData = props.modalData;
  return (
    <div className="ModalMoviecard">
      <div className="ImageDescription">
        <img className="MovieImage" src={modalData["poster"]} alt="" />
        <div className="DescriptionContainer">
          <p className="Description">{modalData["description"]}</p>
        </div>
      </div>
      <div className="RatingsContainer">
        <div className="UserRatings">
          <h2>{modalData["voteAverage"]}</h2>
        </div>

        <div className="VoteCount">
          <h2>{modalData["voteCount"]}</h2>
        </div>
        <div className="AddToFavorites">
          <h3>Add To Favorites</h3>
        </div>
      </div>
    </div>
  );
};

export default ModalMoviecard;
