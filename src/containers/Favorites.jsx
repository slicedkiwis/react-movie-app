import { useState } from "react"
import FavoriteMoviecard from "../components/FavoriteMoviecard"
const Favorites = (props) => {
  return (
    <div className="FavoritesPage">
       <div className="Container">
        {
        props.movies.length > 0 ?
        props.movies.map(
        movie =>{
        <FavoriteMoviecard
        />
        }
        )
        :
        null
        }
       </div> 
    </div>
  )
}

export default Favorites