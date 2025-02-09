// DO NOT DELETE
import { useState, useEffect } from 'react'
import Header from './Header'
import { Description } from './Description'
import { DogListContainer } from './DogListContainer'
import './App.css'

const DEFAULT_DOG_URL = 'https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg'
const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random'
const DOG_LIST_API_URL = 'https://dog.ceo/api/breeds/list/all'

/**
 * Appコンポーネント
 * 
 * 実装方針：
 * 1. 画像URLと犬種リストの状態管理
 * 2. API呼び出しによるデータ取得
 * 3. 子コンポーネントへのデータ受け渡し
 * 
 * 注意点：
 * - 状態管理は親コンポーネントで行う（状態のリフトアップ）
 * - ロジックは親コンポーネントに集中させる
 * - 子コンポーネントにはpropsで必要なデータのみ渡す
 */

// @ts-check
export const App = () => {
  // 状態管理
  const [imageUrl, setImageUrl] = useState(DEFAULT_DOG_URL)
  const [dogBreeds, setDogBreeds] = useState({})

  // 犬種リストの取得
  useEffect(() => {
    const fetchDogList = async () => {
      try {
        const response = await fetch(DOG_LIST_API_URL)
        const data = await response.json()
        setDogBreeds(data.message)
      } catch (error) {
        console.error('Error fetching dog list:', error)
      }
    }
    fetchDogList()
  }, [])

  // 犬画像の更新処理
  const imgUpdate = async () => {
    try {
      const response = await fetch(DOG_API_URL)
      const data = await response.json()
      setImageUrl(data.message)
    } catch (error) {
      console.error('Error fetching dog image:', error)
    }
  }

  // 犬画像のリセット処理
  const imgReset = () => {
    setImageUrl(DEFAULT_DOG_URL)
  }

  // レンダリング
  return (
    <div className='container'>
      <Header />
      <Description 
        imageUrl={imageUrl}
        imgUpdate={imgUpdate}
        imgReset={imgReset}
      />
      <DogListContainer />
    </div>
  )
}


// メモ
// JSX（JavaScript XML）は「ジェイエスエックス」と読みます。JavaScriptの構文拡張で、ReactでUIを記述するために使用されます。
// JSXは、HTMLのようなコードをJavaScriptファイル内に記述できます

// useState
// state は useState という関数（React 内では Hooks といいます）を使うことで定義できる
// 疑問：useStateはReactのフック？それともvue3のuseStateと同じ？

// const [dogurl, setDogurl] = useState('https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg')
// Reactでは、状態（state）を直接変更することはできない。setDogurlは状態を更新するための関数です。
// 疑問：なぜ直接変更できないのか？

// ロジックは親コンポーネントに記述する方が望ましいらしい
// 親コンポーネントから子コンポーネントにデータを渡すことをリフトアップといい、コンポーネント間でデータを共有するための一般的なパターンである
// らしいが、課題の指示により子コンポーネントで状態管理行っている。それを正とする理由は面談で確認する（todo）。