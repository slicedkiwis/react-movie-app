import React, {useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import SearchBarItem from "./SearchBarItem";
import "./searchbar.css";
const Searchbar = (props) => {
  const [searchBarMovies, setSearchBarMovies] = useState(
    props.movies
      ? props.movies
      : {
          results: [],
        }
  );
  const apiRequest = `https://api.themoviedb.org/3/search/movie?api_key=${props.apiKey}&language=en-US&query=`;
  return (
    <div className="Container">
      <div className="SearchIcon">
        <SearchIcon />
      </div>
      <input
        onChange={(event) => {
          if (event.target.value.length) {
            fetch(
              `${apiRequest}${event.target.value
                .toLowerCase()
                .replace(/\s/g, "+")}`
            )
              .then((response) => response.json())
              .then((result) => {
                setSearchBarMovies(result);
              });
          } else {
            setSearchBarMovies(props.movies);
          }
        }}
        tabIndex={-1}
        type="text"
        placeholder="Search"
        className="SearchInput"
      ></input>
      <div className="MovieResults">
        {searchBarMovies["results"].map((movie, key) => {
          return (
            <SearchBarItem
              key={movie["id"]}
              movie={movie}
              movies={searchBarMovies}
              setMovies={props.setMainMovies}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Searchbar;
