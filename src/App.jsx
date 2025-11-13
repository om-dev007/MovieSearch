import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom' 
import Navbar from './Components/Navbar'
import Home from './Pages/Home' 
import MovieDetail from './Components/MovieDetail'
import SearchBar from './Components/SearchBar'

const App = () => {
  const [InputVal, setInputVal] = useState('')  
  const [data, setData] = useState([])

  return (
    <div className='bg-gray-600 justify-center'>
      <Routes>
        <Route path='/' element={<Home value={InputVal} data={data} onChangeData={setData} onChangeInput={setInputVal} />} />
        <Route path='/movie/:id' element={<MovieDetail />} />
      </Routes>
    </div>
  )
}

export default App