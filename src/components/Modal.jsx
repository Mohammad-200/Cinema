import React from 'react'

function Modal() {
  return (
    <div className='movieModal'>
      <a href="" className="modalClose">
      <ion-icon name="close"></ion-icon>
      </a>
      <frame
        width='1200'
        height='720'
        src=''
        title='random'
        frameBorder='0'
        allow='accelerometer; clipboard-write; encrypted-mdeia; gyroscope; picture-in-picture; web-share'
        allowFullscreen
      >

      </frame>
    </div>
  )
}

export default Modal
