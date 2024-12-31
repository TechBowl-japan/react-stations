// @ts-check
import { useEffect, useState } from 'react'
import BreedsSelect from './BreedsSelect'
export const DogListContainer = () => {
  //const { breeds } = props

  //犬種一覧データを保持する
  const [breeds, setBreeds] = useState()
  //const [selectedBreed, setSelectedBreed] = useState()
  const [selectedBreed, setSelectedBreed] = useState()

  //選択した犬種を保持
  //const [selectedBreed, setSelectedBreed] = useState()

  useEffect(() => {
    //③ブルダウンリスト作成
    //fetch関数で犬種一覧を取得
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        console.log(response.status)
        //status 200以外の場合
        if (!response.ok) {
          console.log('error')
        } else {
          //status 200の場合
          return response.json() //breedsの犬種一覧を格納
        }
      })
      .then(json => {
        if (json) {
          console.log(json)
          setBreeds(json.message)

          //犬種リスト配列を定義
          let breedsArr = []
          //jsonに格納されてる犬種の値を配列に格納し、optionタグで出力
          for (let key in json.message) {
            //犬種リスト配列にkeyを追加
            //breedsArr = [...breedsArr, key]
            breedsArr = [...breedsArr, key]

            //optionタグ生成
            let option = document.createElement('option')
            //valueとinnerhtmlで犬種名をタグに格納
            //selectタグ内の末尾にoptionタグ追加
            document
              .getElementsByClassName('breedSelectBox')[0]
              .appendChild(option)
            //optionタグのテキスト、value属性にobjectの値を格納
            option.textContent = key
            option.setAttribute('value', key)

            //配列が12より多ければループを抜ける
            if (breedsArr.length > 12) {
              break
            }
          }
          //breeds = breedsArr
          //setBreeds(breedsArr)
          setBreeds(breedsArr)
        }
      }) //then終わり

    //④プルダウン③で選択した犬種の画像を表示する

    //fetchで選択した犬種の画像urlを取得

    ////上限12

    //犬種画像リストの配列定義
    //プルダウンの犬種のvalue取得
    //犬種画像リスト取得
    //Url
    //
  }, [])

  const showBreedImgs = () => {
    const sb = document.getElementsByClassName('breedSelectBox')[0].value

    fetch(`https://dog.ceo/api/breed/${sb}/images`)
      .then(response => {
        //status 200以外の場合
        if (!response.ok) {
          console.log('error')
        } else {
          //status 200の場合
          return response.json() //breedsの犬種一覧を格納
        }
      })
      .then(json => {
        if (json) {
          //let imgsArr = []
          //jsonに格納されてる犬種の値を配列に格納し、optionタグで出力
          //for (let value in json.message) {
          const imgsArr = json.message.forEach(value => {
            //   return img
            // })
            // if (imgsArr.length < 12) {
            //   return
            // }

            //imgタグ生成
            let imgElm = document.createElement('img')
            //valueとinnerhtmlで犬種名をタグに格納
            //selectタグ内の末尾にoptionタグ追加
            document.getElementsByClassName('dogImgList')[0].appendChild(imgElm)
            //optionタグのテキスト、value属性にobjectの値を格納
            imgElm.setAttribute('src', value)
            imgElm.setAttribute('width', '200')
            imgElm.setAttribute('alt', '')

            //配列が12より多ければループを抜ける
            // if (imgsArr.length > 12) {
            //   break
            // }
            // }
          })
          //return imgsArr
          setSelectedBreed(imgsArr)
        }
      })
  }

  //stateに格納
  return (
    <>
      <div className="dogListContainer">
        <div>
          <span>BreedsSelect</span>
          <BreedsSelect breeds={breeds} />
          <button className="primaryBtn" onClick={showBreedImgs}>
            表示
          </button>
        </div>
        <div className="dogImgList"></div>
      </div>
    </>
  )
}

export default DogListContainer
