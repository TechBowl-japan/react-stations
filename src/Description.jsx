// @ts-check
import { useState } from 'react';
import {DogImage} from './DogImage';

export const Description = () => {
  const [dogUrl, setDogUrl] = useState("https://images.dog.ceo/breeds/schipperke/n02104365_9611.jpg");

  function randomImg() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(res => res.json())
      .then(
        (result) => {
          setDogUrl(result.message)
        }
      )
  }

  return (
  <div>
      <p>犬の画像を表示します。</p>
      <DogImage imageUrl={dogUrl}/>
      <div>
        <button onClick={() => randomImg()}>更新</button>
      </div>
  </div>
  )
}

export default Description
