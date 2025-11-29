// DO NOT DELETE

import './App.css'
import { useState } from 'react'

/**
 * @type {() => JSX.Element}
 */
export const App = () => {
  const [dogUrl, setDogUrl] = useState(
    'https://images.dog.ceo/breeds/retriever-flatcoated/n02099267_2259.jpg',
  )
  return (
    <div>
      <header>Dogアプリ</header>
      <img src={dogUrl} alt="dog" />
    </div>
  )
}
