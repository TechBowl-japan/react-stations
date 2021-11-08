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
      
  const handleClick = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(data => setDogUrl(data.message));
  }

  return (
    <div>
      <div className="App-header">
        <header>
          <h1>Dogアプリ</h1>
        </header>
      </div>
      <div className="wrap">
        <span className="item">犬の画像を表示するサイトです</span>
        <span className="item">
          <img src={ url } />
          <button className="btn" onClick={handleClick}>
            更新
          </button>
        </span>
      </div>
    </div>
  )
}
