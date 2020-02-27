import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, Link } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, history, movieList, setMovieList }) {
    const [movie, setMovie] = useState(null);
    const match = useRouteMatch();

    const fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err.response));
    };

    const saveMovie = () => {
        addToSavedList(movie);
    };

    useEffect(() => {
        fetchMovie(match.params.id);
    }, [match.params.id]);

    if (!movie) {
        return <div>Loading movie information...</div>;
    }
    const handleClick = () => {
        axios
            .delete(`http://localhost:5000/api/movies/${ match.params.id }`)
            .then(res => setMovieList(movieList.filter(i => i.id !== match.params.id)))
        history.push("/")
    }
    return (
    <div className='save-wrapper'>
        <MovieCard movie={movie} />
        
        <div className='save-button' onClick={saveMovie}>
            Save
        </div>
        <div><Link to={`/update-movie/${ match.params.id }`}>Edit Movie</Link></div>
        <button onClick={ handleClick }>Delete This Movie</button>
    </div>
  );
}

export default Movie;
