// DO NOT DELETE

import * as React from 'react'
import './App.css'
import Header from './Header.js'
import Description from './Description.js';
import Dogimage from './DogImage.js';

/**
 * 
 * @type {React.FC}
 */
export const App = () => {
  return (
    <div>
      <div className="App-header">
        <Header title="Dogアプリ" />
      </div>
      <div className="wrap">
        <Description desc="犬の画像を表示するサイトです" />
        <Dogimage url="https://images.dog.ceo/breeds/eskimo/n02109961_21096.jpg" />
      </div>
    </div>
  )
}
