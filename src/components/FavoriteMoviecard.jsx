
const FavoriteMoviecard = (props) => {

  return (
    <div className="FavoriteMoviecard">
        <img src={props.poster} alt="" />
        <div className="Overlay">
            <h2>{props.title}</h2>
            <div className='VoteDisplay'>
            <div className="VoteAverage">{props.voteAverage}</div>
            <div className="Votecount">{props.voteCount}</div>
        </div>
            <p className="Description">{props.description}</p>
        </div>
    </div>
  )
}

export default FavoriteMoviecard