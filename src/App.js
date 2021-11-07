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
  return (
    <div>
      <header>
        <h1>Dogアプリ</h1>
      </header>
      <p>犬の画像を表示するサイトです</p>
      <img src={ url } />;
    </div>
  )
}
