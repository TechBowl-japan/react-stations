// DO NOT DELETE
import { useState } from 'react'
import './App.css'

/**
 * @type {() => JSX.Element}
 */
export const App = () => {
  const [dogUrl, setDogUrl] = useState(
    'https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg',
  )

  // setDogUrl(dogUrl)

  return (
    <div>
      <header>アプリ</header>
      <img src={dogUrl} alt="dog" />
    </div>
  )
}
