// DO NOT DELETE
import * as React from 'react'
import { DogImage } from './DogImage.js';

export function Description(props){
  return(
    <div className="wrap">
      <span className="item">
        {props.desc}
      </span>
      <DogImage url="https://images.dog.ceo/breeds/eskimo/n02109961_21096.jpg" />
    </div>
  )
}
