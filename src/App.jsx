// DO NOT DELETE
import { useEffect, useState } from 'react'
import './App.css'

/**
 * @type {() => JSX.Element}
 */
export const App = () => {
  const [dogUrl, setDogUrl] = useState("https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg");
 
  const fetchImageUrl = async() => {
    const url = 'https://dog.ceo/api/breeds/image/random';
    try {
      const response = await fetch(url);
      const result = await response.json();

      return result.message;
    } catch(error) {
      console.error('fetch error...', error.message);
    }
  };

  const changeImageUrl = async() => {
    const getUrl = await fetchImageUrl()
    setDogUrl(getUrl);
  }
  return (
    <div>
      <header>hogeヘッダー</header>
      <p>犬の画像を表示します。可愛いですね。</p>
      <img src={dogUrl} />
      <button type="button" onClick={() => changeImageUrl()}>更新</button>
    </div>
  )
}
