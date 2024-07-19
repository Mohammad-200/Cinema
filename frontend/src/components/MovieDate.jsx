import React from 'react'
import "./movieDate.css"

function MovieDate({movie}) {
  return (
    // Add active here
    <div className={`date ${movie.active ? 'active' : ''}`}>
        <h2>Check {movie.title} trailer here</h2>
    </div>
  )
}

export default MovieDate
