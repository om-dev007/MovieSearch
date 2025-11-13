import React from 'react'
import { Link } from 'react-router-dom';

const MovieCard = (props) => { 
  console.log(props);
  const movie = props.value;

  return (
    <div className='w-50 my-4 mx-2'>
      <div className='rounded-2xl overflow-hidden object-contain'>
        <Link 
          to={`/movie/${movie.imdbID}`} 
          state={{ movie }}    // optional: MovieDetail can use this to avoid refetch
        > 
          <img className='h-50 w-50' src={movie.Poster} alt={movie.Title} />
        </Link>
      </div>
      <h3 className='text-wrap font-sm font-semibold'> {movie.Title} </h3>
      <h3 className='mb-2'> {movie.Year}  </h3>
    </div>
  )
}

export default MovieCard