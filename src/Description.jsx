// @ts-check
import DogImage from "./DogImage"
import { useState } from 'react'

export const Description = () => {
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
    <>      
      <p>犬の画像を表示するサイトです。</p>
      <DogImage imageUrl={dogUrl} />
      <button onClick={fetchDogImage}>更新</button>
    </>
  )
}

export default Description
