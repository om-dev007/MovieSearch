import React, { useEffect } from 'react'
import SearchBar from '../Components/SearchBar'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import MovieCard from '../Components/MovieCard'

const Home = (props) => {

  const InputVal = props.value || ''

  const MoviesData = props.data || []

  const TotalMovies = MoviesData.length;

  const apiKey = '272e4749'

  useEffect(() => {
    getData()
  }, [InputVal])

  const getData = async () => {

    if (InputVal.length > 0) {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${InputVal}`)
        props.onChangeData(response.data.Search)
      } catch (err) {
        console.error(err);
      }
    }
  }

  let isMovieAvailable = (
    <div className='absolute top-1/2 left-1/2 transform -transform-x-1/2 -transform-y-1/2 '>
      <div className='w-12 h-12 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin'></div>
    </div>
  )

  return (
    <div className='bg-gray-600 h-[200vh] text-white'>
      <Navbar />
      <SearchBar value={props.value} onChange={props.onChangeInput} />
      <h1 className='font-semibold text-2xl text-center'>Movie List</h1>
      {MoviesData.length > 0 ? (
        <>
          <div className=' px-5 py-3'>
            <h2 className=' text-center font-semibold  text-2xl '>
              <span>{TotalMovies }  </span>   Movies Found
            </h2>
          </div>

          <div className=' px-5 py-3 flex justify-center  flex-wrap gap-5'>
            {MoviesData.map((elem, idx) => {
              return <>
                <MovieCard key={idx} value={elem} />
              </>
            })}
          </div>
        </>
      ) : isMovieAvailable}
    </div>
  )
}

export default Home