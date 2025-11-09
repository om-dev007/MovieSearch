import React, { useEffect, useState } from 'react'
import SearchBar from '../Components/SearchBar'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import MovieCard from '../Components/MovieCard'

const Home = (props) => {
  const InputVal = props.value || ''
  const MoviesData = props.data || []
  const TotalMovies = MoviesData.length
  const apiKey = '272e4749'

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const run = async () => {
      if (!InputVal || InputVal.trim() === '') {
        setHasSearched(false)
        setMessage('Search your favorite movies')
        props.onChangeData && props.onChangeData([])  
        return
      }

      setHasSearched(true)
      setIsLoading(true)
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(InputVal)}`,
          { signal: controller.signal }
        )
        const results = response.data?.Search || []
        props.onChangeData && props.onChangeData(results)
        setMessage(results.length ? '' : 'No results found')
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error(err)
          setMessage('Error fetching results')
          props.onChangeData && props.onChangeData([])
        }
      } finally {
        setIsLoading(false)
      }
    }

    run()

    return () => controller.abort()
  }, [InputVal])

  const loadingUi = (
    <div className='flex justify-center items-center h-48'>
      <div className='w-12 h-12 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin'></div>
    </div>
  )

  const resultsUi = (
    <>
      <div className='px-5 py-3'>
        <h2 className='text-center font-semibold text-2xl'>
          <span>{TotalMovies}</span> Movies Found
        </h2>
      </div>

      <div className='px-5 py-3 flex justify-center flex-wrap gap-5'>
        {MoviesData.map((elem, idx) => (
          <MovieCard key={elem.imdbID || idx} value={elem} />
        ))}
      </div>
    </>
  )

  const emptyUi = (
    <div className='py-10 text-center'>
      <p>{message || 'Search your favorite movies'}</p>
    </div>
  )

  return (
    <div className='bg-gray-600 min-h-screen text-white'>
      <Navbar />
      <SearchBar value={props.value} onChange={props.onChangeInput} />
      <h1 className='font-semibold text-2xl text-center'>Movie List</h1>
      {
        isLoading ? loadingUi : (MoviesData.length > 0 ? resultsUi : (hasSearched ? emptyUi : emptyUi))
      }
    </div>
  )
}

export default Home