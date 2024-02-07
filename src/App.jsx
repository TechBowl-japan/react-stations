// DO NOT DELETE

import './App.css'

/**
 * @type {() => JSX.Element}
 */
export const App = () => {
  return (
    <div>
      <header>
        <h1>初めてのReact</h1>
      </header>
      <p>犬の画像を表示するサイトです！</p>
      <img
        src="https://images.dog.ceo/breeds/stbernard/n02109525_10908.jpg"
        alt="サイトから持ってきた犬の画像"
      />
    </div>
  )
}
