// DO NOT DELETE
import { useState } from 'react'
import Header from './Header'
import { Description } from './Description'
import './App.css'

const DEFAULT_DOG_URL = 'https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg'
const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random'

/**
 *
 * @type {() => JSX.Element}
 */
export const App = () => {
  // stateはそのstateを使用するコンポーネントの最も近い共通の親コンポーネントで管理されるべきであり、
  // その原則は「state のリフトアップ」と呼ばれる
const [imageUrl, setImageUrl] = useState(DEFAULT_DOG_URL)

const imgUpdate = async () => {
  try {
    const response = await fetch(DOG_API_URL)
    const data = await response.json()
    setImageUrl(data.message)
  } catch (error) {
    console.error('Error fetching dog image:', error)
  }
}
const imgReset = () => {
  setImageUrl(DEFAULT_DOG_URL)
}

  return (
    <div className='container'>
      <Header />
      <Description 
        imageUrl={imageUrl}
        imgUpdate={imgUpdate}
        imgReset={imgReset}
      />
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
