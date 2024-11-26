// DO NOT DELETE

import './App.css'

/**
 * @type {() => JSX.Element}
 */
export const App = () => {
  return (
    <div>
      <header>React Station 初級</header>
      <p>犬の画像を表示するサイトです。</p>
      <img src='https://dog.ceo/api/breeds/image/random' />
    </div>
  )
}
