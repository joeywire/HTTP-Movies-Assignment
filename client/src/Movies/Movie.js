import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  //Organize page data - destructure props, set up needed state, destructure imports, etc. 
  const { addToSavedList, getMovieList } = props;
  const [movie, setMovie] = useState(null);
  const params = useParams();
  // could also just pull out id via destructuring: `const { id } = useParams();`
  const { push } = useHistory();

  //Call API for specific movie info 
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      //Set res data to components state
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  //Create a function to delete our movie and handle UX
  const deleteMovie = () => {
    //using our delete call - for structure reference API docs 
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        //We want to reset application state here as there is one less movie
        getMovieList();
        //send user back to Movie List/ home page 
        push('/');
      })
      .catch(err => console.log(err))
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  //make sure to grab our movie data every time the id(from our url) changes
  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  // Handlig loading 
  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link key={movie.id} to={`/update-movie/${movie.id}`}>
        <button>Edit Movie</button>
      </Link>
      <button onClick={deleteMovie}>Delete Movie</button>
    </div>
  );
}

export default Movie;
