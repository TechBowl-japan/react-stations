// DO NOT DELETE

import './App.css'
import { useState } from 'react'
/**
 * @type {() => JSX.Element}
 */
export const App = () => {
  const [dogUrl, setDogUrl] = useState('https://dog.ceo/api/breeds/image/random')

  const fetchDogImage = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random')
      const data = await response.json()
      setDogUrl(data.message)
    } catch (error) {
      console.error('Error fetching dog image:', error)
    }
  }

  return (
    <div>
      <header>React Station 初級</header>
      <p>犬の画像を表示するサイトです。</p>
      <img src={dogUrl} alt="犬の画像" />
      <button onClick={fetchDogImage}>更新</button>
      commit test
    </div>
  )
}
