import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div className="movie-list">
      { //Map over prop movies rendering a MovieCard component and that is linked to its corresponding Movie component via dynamic routes 
        movies.map(movie => (
          //Here wer're utilize the dynamic route created in App.js - Rect knows :id is a place holder 
          //and here we are finalizing the url as well as linking that url to a specific component to render 
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            {/* Rendering movies here just to display the data - doesn't have to do with any routes */}
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
