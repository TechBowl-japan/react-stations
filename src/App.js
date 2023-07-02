// DO NOT DELETE

// import * as React from 'react'
import React, { useState } from 'react';
import './App.css'
import Header from './Header'
import Description from './Description';
import DogImage from './DogImage';

/**
 * 
 * @type {React.FC}
 */
export const App = () => {
  const [dogUrl,setDogUrl] = useState("https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg");
  return (
    <div>

      <Header />
      <DogImage url= {dogUrl} />
      <Description />

      <button onClick={()=>changeDogUrl()}>更新</button>
    </div>
  )
  function changeDogUrl(){
    console.log("test")
    var rUrl;
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(res => res.json())
      .then(
        (result) =>{
          console.log("fetch");
          console.log(result.message);
          setDogUrl(result.message);
        }
      )
  }
}

