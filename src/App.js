// DO NOT DELETE
import * as React from 'react'
import './App.css'
import { Header } from './Header.js'
import { Description } from './Description.js';
import { Dogimage } from './DogImage.js';
import { useState } from 'react';
/**
 * 
 * @type {React.FC}
 */
export const App = () => {
  const [dogurl, setDogUrl] = useState("https://images.dog.ceo/breeds/eskimo/n02109961_21096.jpg");
  const handleClick = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(data => setDogUrl(data.message));
  }

  return (
    <div>
      <Header title="Dogアプリ" />
      <div className="wrap">
        <Description desc="犬の画像を表示するサイトです" />
        <span className="item">
          <Dogimage url={dogurl} />
          <button className="btn" onClick={handleClick}>
            更新
          </button>
        </span>
      </div>
    </div>
  )
}
