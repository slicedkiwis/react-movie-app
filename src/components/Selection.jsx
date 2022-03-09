import { useEffect } from "react"

const Selection = (props) => {
   const movies = props.movies
   const minRating = props.minRating 
   const genre = props.genre  
   movies.filter(movie=>{
        return (movie['results']['genre_ids'].includes(genre) && movie['results']['vote_average'] >= minRating)
   })
   
  return (
    <>
    </>
  )
}

export default Selection