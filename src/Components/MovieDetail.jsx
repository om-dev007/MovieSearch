import  { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

const isIncomplete = (m) => {
  if (!m) return true
  return !m.Plot || m.Plot === 'N/A' || !m.Director || !m.imdbRating
}

const MovieDetail = () => {
  const { id } = useParams() // imdbID
  const location = useLocation()
  const initialMovie = location.state?.movie || null

  const [movie, setMovie] = useState(initialMovie)
  const [loading, setLoading] = useState(isIncomplete(initialMovie))
  const [error, setError] = useState('')

  const apiKey = '272e4749'

  useEffect(() => {

    if (!id) return

    if (!isIncomplete(movie)) {
      setLoading(false)
      return
    }

    let cancelled = false
    const fetchDetail = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${encodeURIComponent(id)}&plot=full`)
        if (cancelled) return
        if (res.data && res.data.Response !== 'False') {
          setMovie(prev => ({ ...(prev || {}), ...res.data }))
        } else {
          setError('Details not found')
        }
      } catch (err) {
        console.error(err)
        if (!cancelled) setError('Error fetching details')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchDetail()
    return () => { cancelled = true }
  }, [id]) // run when id changes

  if (loading) return <div className='p-6'>Loading...</div>
  if (error) return <div className='p-6 text-red-400'>{error}</div>
  if (!movie) return <div className='p-6'>No movie selected</div>

  return (
    <div className='bg-white text-black p-5 max-w-3xl mx-auto'>
      <div className='flex gap-6'>
        <img src={movie.Poster} alt={movie.Title} className='w-48' />
        <div>
          <h1 className='text-2xl font-bold'>{movie.Title} ({movie.Year})</h1>
          <p className='text-sm text-gray-700 mt-2'>{movie.Plot}</p>
          <p className='mt-3'><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail