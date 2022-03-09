import './sidebar.css'
import Genre from '../components/Genre'
import { useEffect } from 'react'
const Sidebar = (props) => {
useEffect( () =>{
const movieListApiKey ='https://api.themoviedb.org/3/genre/movie/list?api_key=638b33e40e73702eec3c27336ac7870e&language=en-US' 
if(!localStorage.getItem('movieGenreObject')){
      fetch(movieListApiKey).then( response => response.json()).then(
        (result) =>{
        console.log(result)
        localStorage.setItem('movieGenreObject',JSON.stringify(result))
       }
      )
      }
    }
  ,[])
  return (
    <div className="Sidebar">
        <div className="Header">
            <h2>Kiwi <span>Films</span></h2>
            <img src="" alt="" /> 
        </div>
    <div className="genreDisplay">
        <ul>
         {
           JSON.parse(localStorage.getItem('movieGenreObject'))['genres'].map(
             (genre) => {
               return <Genre setGenre ={props.setGenre} name = {genre['name']} genreKey ={genre['id']} key = {genre['id']}/> 
           })
         }           
        </ul>
     </div>
    </div>
  )
}
export default Sidebar