import { useEffect, useState } from 'react'
import Loadingscreen from '../components/Loadingscreen'
import Modal from '../components/Modal'
import ModalMoviecard from '../components/ModalMoviecard'
import Moviecard from '../components/Moviecard'
import './main.css'

const Main = (props) => {
const apiKey = '638b33e40e73702eec3c27336ac7870e'
const[modalData,setModalData]=useState(null)
const[toggleModal,setToggleModal] = useState(false) 
const[movies,setMovies] = useState(props.movies)
const[loadMore,setLoadMore] = useState(1)
useEffect(
    () =>{
        if(props.genreId && !localStorage.getItem(props.genreName)){
          const searchByGenreApi = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&vote_count.gte=5&release_date.gte=2000&with_genres=${props.genreId}`
          fetch(searchByGenreApi).then( response => response.json()).then(
            result =>{
                result['results'].push(
                {
                title:null,
                poster:null,
                description:null, 
                voteCount:null,
                voteAverage:null
                }
                )
                localStorage.setItem(props.genreName,JSON.stringify(result))
                setMovies(result)
            }
          )
        }
        if(props.genreId && movies)
          setMovies(JSON.parse(localStorage.getItem(props.genreName)))
        else
          setMovies(JSON.parse(localStorage.getItem('popular')))
    } 
  ,[props.genreId, props.movies])
useEffect(
  () =>{
    if(props.genreId){
      const searchByGenreApi = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&vote_count.gte=5&release_date.gte=2000&with_genres=${props.genreId}&page=${loadMore}`
      fetch(searchByGenreApi).then(response => response.json()).then(
        result =>{
            console.log(result)
            let oldMovieList = movies['results']
            oldMovieList.pop()
            
            let newMovieList = oldMovieList.concat(result['results'])
            console.log("test")
            newMovieList.push(
               {
                title:null,
                poster:null,
                description:null, 
                voteCount:null,
                voteAverage:null
              }
            
            )
            let oldMovieObject = JSON.parse(localStorage.getItem(props.genreName))
            oldMovieObject['results'] = newMovieList  

            localStorage.setItem(props.genreName,JSON.stringify(oldMovieObject))
            setMovies(oldMovieObject)  
        }
      )

    }
  } 
  ,[loadMore])
console.log(typeof(movies));
return (
    <div className="Main">
        <div className="Header">
              <div className='Container'>
              <div className='SearchIconContainer'>
              <img className = 'SearchIcon'src="https://www.clipartmax.com/png/full/8-85921_search-instagram-search-icon-vector.png" alt="" />
              </div>
            <input type="text" placeholder="Search"></input>
            </div>
            <div className='Favorites'>
               <h3>Favorites</h3>
            </div> 
        </div>
        <div className="Content">
          {
           movies ? movies['results'].map(
              movie =>{
                return movie ? 
                <Moviecard 
                movie = {movie}
                setModalData = {setModalData}
                toggleModal = {setToggleModal}
                key = {`${movie['id']}`}
                setLoadMoreData = {setLoadMore}
                loadMore = {loadMore}
                />
                :
                null
                }  
            )
            :
              <Loadingscreen/>
          }
         
        { toggleModal ?
         <Modal toggleModal = {toggleModal} setToggleModal = {setToggleModal}>
          <ModalMoviecard
            modalData = {modalData}
          />
         </Modal>
        :null
        } 
         
         </div>
    </div>
  )
}

export default Main