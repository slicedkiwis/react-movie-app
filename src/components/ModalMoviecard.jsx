import './modalmoviecard.css'
const ModalMoviecard = (props) => {
  const modalData = props.modalData
  return (
    <div className="ModalMoviecard">
      <div className="Card">
        <div className="ImgContainer">
          <img src={modalData['poster']} alt="" />
        </div>
        <div className="RatingsContainer">
          <div className="Rating">
            <h2>{modalData['voteAverage']}</h2>
          </div>
          <div className="VoteCount">
            <h2>{modalData['voteCount']}</h2>
          </div>
        </div>
      </div>
      <div className='DescriptionContainer'>
        <p className="Description">{modalData['description']}</p>
      </div>
    </div>
  );
};

export default ModalMoviecard;
