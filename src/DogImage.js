// DO NOT DELETE

import * as React from 'react'
import { useState } from 'react';

function Dogimage(props){
  const [url, setDogUrl] = useState(props.url);
  const handleClick = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(data => setDogUrl(data.message));
  }

  return(
    <span className="item">
      <img src={url} />
      <button className="btn" onClick={handleClick}>
        更新
      </button>
    </span>
  )
}

export default Dogimage;
