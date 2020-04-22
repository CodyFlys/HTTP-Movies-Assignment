import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, Route, useHistory, useParams } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const {push} = useHistory();
  const { id } = useParams();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res =>{
      push(`/`)
    })
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>

      <button onClick={() => push(`/update-movie/${match.params.id}`)}>EDIT MOVIE</button>
      <button onClick={deleteMovie}>DELETE</button>

    </div>
  );
}

export default Movie;
