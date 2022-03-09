
const Genre = (props) => {
  return (
    <li className={props.name} onClick = {() =>{props.setGenre(props.genreKey)}}>{props.name}</li>
  )
}

export default Genre