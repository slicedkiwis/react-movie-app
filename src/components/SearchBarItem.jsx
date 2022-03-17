const SearchBarItem = (props) => {
  return (
    <>
      <div className="Movie">
        <div
          className="TitleContainer"
          onClick={() => {
            let newMovies = {
              results: [props.movie],
            };
            props.setMovies(newMovies);
          }}
        >
          <p> {props.movie["title"]}</p>
        </div>
      </div>
    </>
  );
};

export default SearchBarItem;
