import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BookContainer from './BookContainer'
import SearchContainer from './SearchContainer'
import GenreContainer from './GenreContainer'
import Audiobookdetailscontainer from './Audiobookdetailscontainer'

function Content() {
  return (
    
   
    <Routes>
       <Route path='/' element={<BookContainer/>}/>

      <Route path='/audiobooks' element={<BookContainer/>}/>

      <Route path='/audiobooks/:id' element={<Audiobookdetailscontainer/>}/>

      <Route path='/search' element={<BookContainer/>}/>

      <Route path='/genres' element={<GenreContainer/>}/>
      
    </Routes>
   
  )
}

export default Content