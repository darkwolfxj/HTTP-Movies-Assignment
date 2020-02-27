import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import MovieCard from "./MovieCard";

function MovieList({ movies, setMovieList }) {
    const initState = { title: "", director: "", metascore: "", stars: "" }
    const [movieValue, setMovieValue] = useState(initState)
    const handleChange = (e) => setMovieValue({ ...movieValue, [e.target.name]: `${ e.target.value }` })
    const handleChangeArr = (e) => setMovieValue({ ...movieValue, stars: [e.target.value] })
    const handleSubmit = (e) => {
        e.preventDefault()
        e.persist()
        axios
            .post("http://localhost:5000/api/movies/", { id: Math.random(), title: `${ movieValue.title }`, director: `${ movieValue.director }`, metascore: JSON.parse(movieValue.metascore), stars: movieValue.stars })
            .then(res => { setMovieList(res.data) })
        setMovieValue(initState)
    }
  return (
    <div className="movie-list">
        <form onSubmit={ handleSubmit }>
            <input onChange={ handleChange } name="title" type="text" value={ movieValue.title } placeholder="Movie Title"/>
            <input onChange={ handleChange } name="director" type="text" value={ movieValue.director } placeholder="Director"/>
            <input onChange={ handleChange } name="metascore" type="number" value={ movieValue.metascore } placeholder="Metascore"/>
            <textarea onChange={ handleChangeArr } name="stars" type="text" value={ movieValue.stars } placeholder="Stars"/>
            <button>Add Movie</button>
        </form>
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
