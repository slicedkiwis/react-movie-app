import './moviecard.css'
const Moviecard = (props) => {
  const sendModalData = () =>{
    const modalData  = 
    {
      movie:movie,
      title:title,
      poster:poster,
      description:description, 
      voteCount:voteCount,
      voteAverage:voteAverage
    }
    props.setModalData(modalData)
    props.toggleModal(true)
  }
  
  const movie = props.movie
  const title = movie['title']
  const poster = `${JSON.parse(localStorage.getItem('configData'))['images']['secure_base_url']}original${movie['poster_path']}`
  const description = movie['overview']
  const voteCount = movie['vote_count']
  const voteAverage = movie['vote_average'] 
    
  return (
    <div className="Moviecard" onClick={sendModalData}>
        <img src={poster} alt="" />
        <h2>{title}</h2>
        <div className="Votedisplay">
            <div className="Votecount">{voteCount}</div>
            <div className="voteAverage">{voteAverage}</div>
        </div>
        <p className="Description">{description}</p>
    </div>
  )
}

export default Moviecard