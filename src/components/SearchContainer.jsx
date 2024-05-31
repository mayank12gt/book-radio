import React from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

function SearchContainer() {

  const searchParams = new URLSearchParams(useLocation().search)

  const searchQuery = searchParams.get('search')

  return (
    <div>{searchQuery}</div>
  )
}

export default SearchContainer