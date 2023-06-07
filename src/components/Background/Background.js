import './Background.css';

import React from 'react';

function Background(props) {
  const height = props.height
  return (
    <ul className="circles" style={{ height: height ? `${height}` : "100%" }}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul> 
  )
}

export default Background