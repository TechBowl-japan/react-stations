// DO NOT DELETE
import * as React from 'react'
import { Dogimage } from './DogImage.js';
import { useState } from 'react';

export function Description(props){
  const [dogurl, setDogUrl] = useState("https://images.dog.ceo/breeds/eskimo/n02109961_21096.jpg");
  const handleClick = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(data => setDogUrl(data.message));
  }

  return(
    <div className="wrap">
      <span className="item">
        {props.desc}
      </span>
      <span className="item">
        <Dogimage url={dogurl} />
        <button className="btn" onClick={handleClick}>
          {props.text}
        </button>
      </span>
    </div>
  )
}
