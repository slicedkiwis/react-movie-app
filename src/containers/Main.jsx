import { useEffect } from 'react'
import Moviecard from '../components/Moviecard'
import './main.css'

const Main = (props) => {
const popularMovieListApiKey = 'https://api.themoviedb.org/3/movie/popular?api_key=638b33e40e73702eec3c27336ac7870e&language=en-US&page=1'
const posterSizeConfigDataApiKey = 'https://api.themoviedb.org/3/configuration?api_key=638b33e40e73702eec3c27336ac7870e'
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
  return (
    <div className="Main">
        <div className="Search">
            <input type="text" placeholder="Search" />
        </div>
        <div className="Content">
         {JSON.parse(localStorage.getItem('popularMovieList'))['results'].map(
          (movie) =>{
            return <Moviecard 
            title = {movie['title']}
            poster = {`${JSON.parse(localStorage.getItem('configData'))['images']['secure_base_url']}original${movie['poster_path']}`}
            description = {movie['overview']}
            voteCount = {movie['vote_count']}
            voteAverage = {movie['vote_average']} 
            key = {movie['id']}
            />
         })}
         </div>
    </div>
  )
}

export default Main