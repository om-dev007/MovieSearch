import React from 'react'

const MovieCard = (props) => {
  return (
    <div className='w-50 my-4 mx-2'>
      <div className='flex flex-wrap rounded-2xl overflow-hidden object-contain'>
        <img className='h-50 w-50' src={props.value.Poster} alt="" />
      </div>
      <h3 className='text-wrap font-sm  font-semibold'> {props.value.Title} </h3>
      <h3 className='mb-2'> {props.value.Year}  </h3>
    </div>
  )
}

export default MovieCard