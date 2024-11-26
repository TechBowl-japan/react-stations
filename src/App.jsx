// DO NOT DELETE

import './App.css'
import { useState } from 'react'
/**
 * @type {() => JSX.Element}
 */
export const App = () => {
  const [dogUrl, setDogUrl] = useState('https://dog.ceo/api/breeds/image/random')
  return (
    <div>
      <header>React Station 初級</header>
      <p>犬の画像を表示するサイトです。</p>
      <img src= {dogUrl}/>
      <button onClick={() => setDogUrl('https://images.dog.ceo/breeds/hound-english/n02089973_1132.jpg')}>更新</button>
    </div>
  )
}
