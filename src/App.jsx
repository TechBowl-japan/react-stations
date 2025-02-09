// DO NOT DELETE

import './App.css'

/**
 * @type {() => JSX.Element}
 */
export const App = () => {
  return (
    <div>
      <header>Dogアプリ</header>
      <p>犬の画像を表示するサイトです</p>
      <img src="https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg" alt="犬の画像" />
    </div>
  )
}


// メモ
// JSX（JavaScript XML）は「ジェイエスエックス」と読みます。JavaScriptの構文拡張で、ReactでUIを記述するために使用されます。
// JSXは、HTMLのようなコードをJavaScriptファイル内に記述できます
// 