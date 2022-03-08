import './sidebar.css'
import Genre from '../components/Genre'
import { useEffect } from 'react'
const Sidebar = (props) => {
useEffect( () =>{
const movieListApiKey ='https://api.themoviedb.org/3/genre/movie/list?api_key=638b33e40e73702eec3c27336ac7870e&language=en-US' 
if(!localStorage.getItem('movieGenreList')){
      fetch(movieListApiKey).then( response => response.json()).then(
       (result) =>{
        let movieGenreList =[] 
        result['genres'].forEach((genre) => {
          movieGenreList.push(genre['name'])
        })
        localStorage.setItem('movieGenreList',JSON.stringify(movieGenreList))
       }
      )
      }
    }
  ,[])
  return (
    <div className="Sidebar">
        <div className="Header">
            <h2>Kiwi Films</h2>
            <img src="" alt="" /> 
        </div>
    <div className="genreDisplay">
        <ul>
         {
          JSON.parse(localStorage.getItem('movieGenreList')).map( (genre) =>{
             return <Genre name = {genre} key ={genre}/>
         })}           
        
        </ul>
     </div>
    </div>
  )
}
export default Sidebar