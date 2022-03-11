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
  const sendLoadMoreData = () =>{
    props.setLoadMoreData(props.loadMore+1)
  }
  const movie = props.movie
  const title = movie['title']
  const poster = `${JSON.parse(localStorage.getItem('configData'))['images']['secure_base_url']}w500${movie['poster_path']}`
  const description = movie['overview']
  const voteCount = movie['vote_count']
  const voteAverage = movie['vote_average'] 
  return (
    <div className={movie['title'] ? "Moviecard":'LoadMoreCard'} onClick={movie['title']?sendModalData:sendLoadMoreData}>
         {
          movie['title']?
        <>
        <img src={poster} alt="" />
        <div className="Overlay">
            <h2>{title}</h2>
            <div className='VoteDisplay'>
            <div className="VoteAverage">{voteAverage}</div>
            <div className="Votecount">{voteCount}</div>
        </div>
            <p className="Description">{description}</p>
        </div>
        </>
        :
          <>
          <h1>+</h1>
          <h2>Load More</h2>
          </>
        } 
    </div>
  )
}

export default Moviecard