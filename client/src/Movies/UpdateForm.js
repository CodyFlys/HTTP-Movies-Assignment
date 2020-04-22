import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateForm = (props) => {
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`).then(response => {
          console.log(response.data);
          setMovie(response.data);
        });
      }, [id]);

    const handleChanges = (e) => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'stars') {
            value = value.split(',')
        } 
        if (e.target.name === 'metascore') {
            value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            push(`/movies/${movie.id}`)
        })
    }

    return (
        <div>
            UPDATEFORM RENDERING
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChanges} name="title" placeholder="title" value={movie.title}/>
                <input type="text" onChange={handleChanges} name="director" placeholder="director" value={movie.director}/>
                <input type="text" onChange={handleChanges} name="metascore" placeholder="metascore" value={movie.metascore}/>
                <input type="text" onChange={handleChanges} name="stars" placeholder="stars" value={movie.stars}/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default UpdateForm