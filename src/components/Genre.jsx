const Genre = (props) => {
  return (
    <li
      className={props.name}
      onClick={() => {
        props.getGenreData([props.genreKey, props.name]);
      }}
    >
      {props.name}
    </li>
  );
};

export default Genre;
