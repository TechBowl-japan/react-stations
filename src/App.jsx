// DO NOT DELETE
import { useState } from 'react'
import './App.css'

/**
 *
 * @type {() => JSX.Element}
 */
export const App = () => {

  const DEFAULT_DOG_URL = 'https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg'
  // const NEW_DOG_URL = 'https://images.dog.ceo/breeds/hound-english/n02089973_1132.jpg'
  const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random'
  

  // useState を使って dogUrl という state を定義
  const [dogurl, setDogurl] = useState(DEFAULT_DOG_URL)

  const imgUpdate = async () => {
    try {
      const response = await fetch(DOG_API_URL)
      const data = await response.json()
      setDogurl(data.message)
    } catch (error) {
      console.error('Error fetching dog image:', error)
    }
  }
  const imgReset = () => {
    setDogurl(DEFAULT_DOG_URL)
  }

  return (
    <div>
      <header>Dogアプリ</header>
      <p>犬の画像を表示するサイトです</p>
      <img src={dogurl} alt="犬の画像" style={{ width: '300px', height: 'auto' }} />
      <button onClick={imgUpdate}>更新</button>
      <button onClick={imgReset}>戻す</button>
    </div>
  )
}


// メモ
// JSX（JavaScript XML）は「ジェイエスエックス」と読みます。JavaScriptの構文拡張で、ReactでUIを記述するために使用されます。
// JSXは、HTMLのようなコードをJavaScriptファイル内に記述できます

// useState
// state は useState という関数（React 内では Hooks といいます）を使うことで定義できる
// 疑問：useStateはReactのフック？それともvue3のuseStateと同じ？

// const [dogurl, setDogurl] = useState('https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg')
// Reactでは、状態（state）を直接変更することはできない。setDogurlは状態を更新するための関数です。
// 疑問：なぜ直接変更できないのか？
