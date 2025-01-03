// @ts-check
import { useEffect, useState } from 'react'
import BreedsSelect from './BreedsSelect'

export const DogListContainer = () => {
  //犬種一覧データを保持する
  const [breeds, setBreeds] = useState([])
  const [selectedBreed, setSelectedBreed] = useState('affenpinscher')
  const [urls, setUrls] = useState([])

  useEffect(() => {
    //犬種一覧取得
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        //status 200以外の場合
        if (!response.ok) {
          console.log('error')
        } else {
          return response.json() //breedsの犬種一覧を格納
        }
      })
      .then(json => {
        if (json) {
          setBreeds(Object.keys(json.message))
        }
      })
      .catch(error => console.error(error))
  }, [])

  //ボタン
  const getBreed = e => {
    console.log(`selectedBreed:${e.target.value}`)
    setSelectedBreed(e.target.value)
  }

  const changeBreed = () => {
    //選択犬種の画像一覧取得
    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/4`)
      .then(response => {
        if (!response.ok) {
          console.log('error')
        } else {
          return response.json() //breedsの犬種一覧を格納
        }
      })
      .then(json => {
        const LimitNum = 12
        const limitedUrls = json.message.slice(0, LimitNum + 1) //画像の上限数を12に指定
        setUrls(limitedUrls)
      })
      .catch(error => console.error(error))
  }

  return (
    <>
      <h1>json List</h1>
      <BreedsSelect breeds={breeds} selectedBreed={getBreed} />
      <button onClick={changeBreed}>表示</button>
      <ul className="dogImgList">
        {urls.map((url, index) => (
          <li key={index}>
            <img
              src={url}
              alt={`Image of ${selectedBreed} ${index}`}
              width="200"
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default DogListContainer
