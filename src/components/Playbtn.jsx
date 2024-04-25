import React from 'react'
import "./playBtn.css"
import Modal from './Modal'

function Playbtn({ movie }) {
  return (
    // Add active here
    <>
      <div className={`trailer d-flex align-items-center justify-content-center ${movie.active  ? 'active' : ''}`}>
        <a href="#" className="playBtn">
        <ion-icon name="play"></ion-icon>    
        </a>
        <p>Watch the trailer</p>
      </div>
      {/* {movie.active && <Modal />} Work here for the movie trailer */}
    </>
    
  )
}

export default Playbtn
