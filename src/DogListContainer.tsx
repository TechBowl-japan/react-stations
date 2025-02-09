// 実装方針：
// 1. コンポーネント内でbreeds状態を管理（useState）
// 2. useEffectでAPI呼び出し
// 3. レスポンスから犬種リストを生成してbreeds状態に保存
//
// 注意点：
// - 2階層以降は無視（サブブリードは含めない）
// - useEffectの依存配列は空配列を指定

// @ts-check
import { useState, useEffect } from 'react'
import { BreedsSelect } from './BreedsSelect'

type Props = {
  dogBreeds: {[key: string]: string[]}
}

const DOG_LIST_API_URL = 'https://dog.ceo/api/breeds/list/all'

export const DogListContainer = ({ dogBreeds }: Props) => {
  // 犬種リストの状態管理
  const [breeds, setBreeds] = useState<string[]>([])

  // 犬種リストの取得
  useEffect(() => {
    const fetchDogList = async () => {
      try {
        const response = await fetch(DOG_LIST_API_URL)
        const data = await response.json()
        // オブジェクトのキーを配列として取得（サブブリードは無視）
        const breedsList = Object.keys(data.message)
        setBreeds(breedsList)
      } catch (error) {
        console.error('Error fetching dog list:', error)
      }
    }
    fetchDogList()
  }, []) // 依存配列は空

  return (
    <div className="dog-list">
      <BreedsSelect breeds={breeds} />
    </div>
  )
}

export default DogListContainer