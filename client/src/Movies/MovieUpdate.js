import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, Redirect } from "react-router-dom";

export default function MovieUpdate({ movieList, setMovieList, history }) {
    const match = useRouteMatch()
    const [editValue, setEditValue] = useState({})
    const handleChange = (e) => setEditValue({ ...editValue, [e.target.name]: `${ e.target.value }` })
    const handleChangeArr = (e) => setEditValue({ ...editValue, stars: [e.target.value] })
    const handleSubmit = (e) => {
        e.preventDefault()
        e.persist()
        axios
            .put(`http://localhost:5000/api/movies/${ match.params.id }`, { id: match.params.id, title: `${ editValue.title }`, director: `${ editValue.director }`, metascore: JSON.parse(editValue.metascore), stars: editValue.stars })
            .then(res => { 
                setMovieList([...movieList.filter(i => i.id !== match.params.id) ,res.data])
                console.log("movies", res.data)
            })
            history.push("/")
    }
    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <label htmlFor="title">Title:</label>
                <input onChange={ handleChange } name="title" type="text" value={ editValue.title } placeholder="title" />
                <label htmlFor="director">Director:</label>
                <input onChange={ handleChange } name="director" type="text" value={ editValue.director } placeholder="director" />
                <label htmlFor="metascore">Metascore:</label>
                <input onChange={ handleChange } name="metascore" type="number" value={ editValue.metascore } placeholder="metascore" />
                <label htmlFor="stars">Stars:</label>
                <textarea onChange={ handleChangeArr } name="stars" type="text" value={ editValue.stars } placeholder="stars" />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    )
}
