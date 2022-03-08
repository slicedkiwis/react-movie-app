import './moviecard.css'
const Moviecard = (props) => {
  return (
    <div className="Moviecard">
        <img src={props.poster} alt="" />
        <h2>{props.title}</h2>
        <div className="Votedisplay">
            <div className="Votecount">{props.voteCount}</div>
            <div className="voteAverage">{props.voteAverage}</div>
        </div>
        <p className="Description">{props.description}</p>
    </div>
  )
}

export default Moviecard