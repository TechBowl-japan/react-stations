// DO NOT DELETE
import { useState } from 'react'
import './App.css'
import Header from './Header'
import Description from './Description'
import DogListContainer from './DogListContainer'

/**
 * @type {() => JSX.Element}
 */
export const App = () => {
  const [dogUrl, setDogUrl] = useState(
    'https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg',
  )

  const onClickUrl = () => {
    //fetchでapi呼び出す
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => {
        //status
        console.log(response.status)
        //status 200以外
        if (!response.ok) {
          setDogUrl(
            'https://images.dog.ceo/breeds/hound-english/n02089973_1132.jpg',
          )
        } else {
          //status 200のとき
          return response.json() //次の.thenにパース済みのJSONデータが渡される。非同期処理のチェーンが正しく動作。
        }
      })
      .then(json => {
        if (json) {
          setDogUrl(json.message)
        }
      })
  }

  return (
    <>
      <Header />
      <main>
        <Description dogUrl={dogUrl} onClickUrl={onClickUrl} />
        <DogListContainer />
      </main>
    </>
  )
}
