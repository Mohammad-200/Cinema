import React from 'react';
import { Link } from 'react-router-dom';
import './button.css'

function Button({icon, name, bgColor = "#ff3700", color = "#ffffff", to}) {
  return (
   
        <Link to={to} className="mainBtn" style={{color: color, backgroundColor: bgColor}}>
        {icon} {name}
        </Link>
   
  )
}

export default Button

