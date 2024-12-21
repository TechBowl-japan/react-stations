// @ts-check
import { useEffect, useState } from 'react'
export const DogListContainer = () => {
  //犬種一覧データを保持する
  //usestateを定義
  const [breeds, setBreeds] = useState()

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        console.log(response.status)

        //status 200以外
        if (!response.ok) {
          console.log('error')
        } else {
          //status 200
          //breedsの犬種一覧を格納
          return response.json()
        }
      })
      .then(json => {
        if (json) {
          console.log(json)
          setBreeds(json.message)
        }
      })
  }, [])
  //犬種一覧を取得
  //useeffect
  //fetch
  //apiレスポンス
  //犬種リスト配列を生成
  //breedsに格納

  //stateに格納
  return <></>
}

export default DogListContainer
