import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieUpdate from "./Movies/MovieUpdate";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [movieList]);

  return (
    <>
    <SavedList list={savedList} />

    <Route exact path="/">
        <MovieList movies={movieList} setMovieList={ setMovieList } />
    </Route>

    <Route path="/movies/:id" render={ (props) => <Movie addToSavedList={addToSavedList} setMovieList={ setMovieList } movieList={ movieList } { ...props } /> } />
      
    <Route path="/update-movie/:id" render={ (props) => <MovieUpdate movieList={ movieList } setMovieList={ setMovieList } { ...props } /> }  />
    </>
  );
};

export default App;
