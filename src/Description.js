// DO NOT DELETE
import * as React from 'react'
import './App.css'
import Dogimage from './DogImage.js';

function Description(props){
  return(
    <div className="wrap">
      <span className="item">
        {props.desc}
      </span>
      <Dogimage url="https://images.dog.ceo/breeds/eskimo/n02109961_21096.jpg" />
    </div>
  )
}

export default Description;
