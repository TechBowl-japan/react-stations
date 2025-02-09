// DO NOT DELETE
import { useState } from 'react'
import './App.css'

/**
 * ①JSXとは？
 * @type {() => JSX.Element}
 */
export const App = () => {
  // useState を使って dogUrl という state を定義
  // ② setDogurlはなぜ必要？
  const [dogurl, setDogurl] = useState('https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg')

  return (
    <div>
      <header>Dogアプリ</header>
      <p>犬の画像を表示するサイトです</p>
      <img src={dogurl} alt="犬の画像" />
      <button onClick={() => setDogurl('https://images.dog.ceo/breeds/hound-english/n02089973_1132.jpg')}>更新</button>
      <button onClick={() => setDogurl('https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg')}>戻す</button>
    </div>
  )
}


// メモ
// ①JSX（JavaScript XML）は「ジェイエスエックス」と読みます。JavaScriptの構文拡張で、ReactでUIを記述するために使用されます。
// JSXは、HTMLのようなコードをJavaScriptファイル内に記述できます

// useState
// state は useState という関数（React 内では Hooks といいます）を使うことで定義できる
// 疑問：useStateはReactのフック？それともvue3のuseStateと同じ？

// ② 
// const [dogurl, setDogurl] = useState('https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg')
// Reactでは、状態（state）を直接変更することはできない。setDogurlは状態を更新するための関数です。
// 疑問：なぜ直接変更できないのか？
