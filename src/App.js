// DO NOT DELETE

import * as React from 'react'
import './App.css'
import { useState } from 'react';

/**
 * 
 * @type {React.FC}
 */
export const App = () => {
  const [url, setDogUrl] = useState("https://images.dog.ceo/breeds/eskimo/n02109961_21096.jpg");
  // const update = () => setDogUrl("https://images.dog.ceo/breeds/hound-english/n02089973_1132.jpg");
      
  const handleClick = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(data => setDogUrl(data.message));
  }

  return (
    <div>
      <header>
        <h1>Dogアプリ</h1>
      </header>
      <p>犬の画像を表示するサイトです</p>
      <p><img src={ url } /></p>
      <button onClick={handleClick}>
        更新
      </button>
    </div>
  )
}
