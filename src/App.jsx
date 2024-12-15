// DO NOT DELETE
import { useState } from 'react'
import './App.css'
import Header from './Header'
import Description from './Description'

/**
 * @type {() => JSX.Element}
 */
export const App = () => {
  const [dogUrl, setDogUrl] = useState(
    'https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg',
  )

  const onClickUrl = () => {
    //urlを定義
    //const randomUrl;
    //fetchでapi呼び出す
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => {
        //status
        console.log(response.status)
        //status 200以外
        if (!response.ok) {
          console.log('error')

          setDogUrl(
            'https://images.dog.ceo/breeds/hound-english/n02089973_1132.jpg',
          )
        } else {
          //status 200のとき
          return response.json()
          //return response.json(); を書くことで、次の .then にパース済みの JSON データが渡される。
          // これにより、非同期処理のチェーンが正しく動作する。
        }
      })
      .then(json => {
        if (json) {
          console.log(json)
          setDogUrl(json.message)
        }
      })
  }

  return (
    <>
      <Header />
      <main>
        <Description dogUrl={dogUrl} onClickUrl={onClickUrl} />
      </main>
    </>
  )
}
