import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, Redirect } from "react-router-dom";

export default function MovieUpdate({ movieList, setMovieList, history }) {
    const match = useRouteMatch()
    const [movie, setMovie] = useState({})
    const handleChange = (e) => setMovie({ ...movie, [e.target.name]: `${ e.target.value }` })
    const handleChangeArr = (e) => setMovie({ ...movie, stars: [e.target.value] })
    const handleSubmit = (e) => {
        e.preventDefault()
        e.persist()
        axios
            .put(`http://localhost:5000/api/movies/${ match.params.id }`, { id: match.params.id, title: `${ movie.title }`, director: `${ movie.director }`, metascore: JSON.parse(movie.metascore), stars: movie.stars })
            .then(res => { 
                setMovieList([...movieList.filter(i => i.id !== match.params.id) ,res.data])
                console.log("movies", res.data)
            })
            history.push("/")
    }
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${ match.params.id }`)
            .then(res => setMovie(res.data))
    },[match.params.id])
    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <label htmlFor="title">Title:</label>
                <input onChange={ handleChange } name="title" type="text" value={ movie.title } placeholder="title" />
                <label htmlFor="director">Director:</label>
                <input onChange={ handleChange } name="director" type="text" value={ movie.director } placeholder="director" />
                <label htmlFor="metascore">Metascore:</label>
                <input onChange={ handleChange } name="metascore" type="number" value={ movie.metascore } placeholder="metascore" />
                <label htmlFor="stars">Stars:</label>
                <textarea onChange={ handleChangeArr } name="stars" type="text" value={ movie.stars } placeholder="stars" />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    )
}
