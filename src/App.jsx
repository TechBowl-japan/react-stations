// DO NOT DELETE

import './App.css'

/**
 * @type {() => JSX.Element}
 */
export const App = () => {
  return (
    <div>
      <header>
        <h1>To Doアプリ</h1>
      </header>
      <p>犬の画像を表示するサイトです。</p>
      <br></br>
      <img src="https://images.dog.ceo/breeds/pomeranian/n02112018_5540.jpg"
      alt="可愛い犬" />
      {/* 犬の画像と画像の説明文を表示させる。。 */}
    </div>
  )
}
