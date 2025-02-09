// 実装方針：
// 1. コンポーネント内でbreeds状態を管理（useState）
// 2. useEffectでAPI呼び出し
// 3. レスポンスから犬種リストを生成してbreeds状態に保存
// 4. 選択された犬種の状態管理
// 5. 画像取得はボタンクリック時に実行
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
// random/{n}：最大n件の画像をランダム取得
const DOG_IMAGE_API_URL = 'https://dog.ceo/api/breed/{breed}/images/random/12'

export const DogListContainer = ({ dogBreeds }: Props) => {
  // 犬種リストの状態管理
  const [breeds, setBreeds] = useState<string[]>([])
  // 選択中の犬種の状態管理（一時保存用）
  const [tempSelectedBreed, setTempSelectedBreed] = useState<string | null>(null)
  // 確定した犬種の状態管理（画像取得用）
  const [confirmedBreed, setConfirmedBreed] = useState<string | null>(null)
  // 犬種の画像リストの状態管理
  const [breedImages, setBreedImages] = useState<string[]>([])

  // 犬種リストの取得
  useEffect(() => {
    const fetchDogList = async () => {
      try {
        const response = await fetch(DOG_LIST_API_URL)
        const data = await response.json()
        const breedsList = Object.keys(data.message)
        setBreeds(breedsList)
        console.log('Breeds list loaded:', breedsList)
      } catch (error) {
        console.error('Error fetching dog list:', error)
      }
    }
    fetchDogList()
  }, []) // 依存配列は空

  // 犬種の画像リストの取得
  useEffect(() => {
    const fetchBreedImages = async () => {
      try {
        const response = await fetch(DOG_IMAGE_API_URL.replace('{breed}', confirmedBreed || ''))
        const data = await response.json()
        setBreedImages(data.message)
        console.log('Breed images loaded:', data.message.length, 'images')
      } catch (error) {
        console.error('Error fetching breed images:', error)
      }
    }
    if (confirmedBreed) {
      fetchBreedImages()
    }
  }, [confirmedBreed])

  // 犬種選択時のハンドラー（一時保存）
  const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newBreed = event.target.value || null
    setTempSelectedBreed(newBreed)
    console.log('Breed selected (not confirmed):', newBreed)
  }

  // 画像取得ボタンのハンドラー
  const handleFetchImages = () => {
    if (tempSelectedBreed) {
      setConfirmedBreed(tempSelectedBreed)
      console.log('Fetching images for breed:', tempSelectedBreed)
    }
  }

  return (
    <div className="dog-list">
      <div className="breeds-select-container">
        <BreedsSelect 
          breeds={breeds} 
          selectedBreed={tempSelectedBreed} 
          handleBreedChange={handleBreedChange}
        />
      </div>
      <button 
        onClick={handleFetchImages}
        disabled={!tempSelectedBreed}
        className="fetch-images-btn"
      >
        表示
      </button>
      <div className="dog-info">
        <p>表示中のお犬：{confirmedBreed}</p>
        <p>表示中の画像数：{breedImages.length}</p>
      </div>
      <div className="dog-img-wrapper">
        {breedImages.map((image) => (
          <img key={image} src={image} alt="犬種の画像" className="dog-img" />
        ))}
      </div>
    </div>
  )
}

export default DogListContainer