import { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import ModalMoviecard from '../components/ModalMoviecard'
import Moviecard from '../components/Moviecard'
import Selection from '../components/Selection'
import './main.css'

const Main = (props) => {
const popularMovieListApiKey = 'https://api.themoviedb.org/3/movie/popular?api_key=638b33e40e73702eec3c27336ac7870e&language=en-US&page=1'
const posterSizeConfigDataApiKey = 'https://api.themoviedb.org/3/configuration?api_key=638b33e40e73702eec3c27336ac7870e'
const[modalData,setModalData]=useState(null)
const[toggleModal,setToggleModal] = useState(false) 
const[minRating,setMinRating] = useState(0)
const genre = props.genre || null
useEffect( () =>{
   if(!localStorage.getItem('popularMovieList')){
      fetch(popularMovieListApiKey).then(response => response.json()).then(
        (result) =>{
          localStorage.setItem('popularMovieList',JSON.stringify(result)) 
        }
      )
     }
    if( !localStorage.getItem('configData') ){
      fetch(posterSizeConfigDataApiKey).then( response => response.json()).then( (result) =>{
          localStorage.setItem('configData',JSON.stringify(result));
      })

    }
},[]);
const filterMovies = (movie,minRating,genre) =>{
    if((genre && movie['genre_ids'].includes(genre)) && (movie['vote_average'] >= minRating) )
        return true; 
    return (movie['vote_average'] >= minRating) && !genre
   }
const loadFavorites = () =>{
}
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
               <h3 onClick={loadFavorites}>Favorites</h3>
               </div> 
        </div>
        <div className="Content">
         {
         JSON.parse(localStorage.getItem('popularMovieList'))['results'].filter(movie => filterMovies(movie,minRating,genre)).map(
          (movie) =>{
            return <Moviecard 
              movie = {movie}
              setModalData = {setModalData}
              toggleModal = {setToggleModal}
              key = {movie['id']}
            />
         })
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