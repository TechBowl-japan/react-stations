// DO NOT DELETE
import * as React from 'react'
import { useState } from 'react';

export function DogImage(props){
  const [dogurl, setDogUrl] = useState(props.url);
  const handleClick = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(data => setDogUrl(data.message));
  }

  return(
    <span className="item">
      <img src={dogurl} />
      <button className="btn" onClick={handleClick}>
        更新
      </button>
    </span>
  )
}
