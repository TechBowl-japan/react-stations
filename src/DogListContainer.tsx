// 実装方針：
// 1. コンポーネント内でbreeds状態を管理（useState）
// 2. useEffectでAPI呼び出し
// 3. レスポンスから犬種リストを生成してbreeds状態に保存
// 4. 選択された犬種の状態管理
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
const DOG_IMAGE_API_URL = 'https://dog.ceo/api/breed/{breed}/images'

export const DogListContainer = ({ dogBreeds }: Props) => {
  // 犬種リストの状態管理
  const [breeds, setBreeds] = useState<string[]>([])
  // 選択中の犬種の状態管理
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null)
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
        const response = await fetch(DOG_IMAGE_API_URL.replace('{breed}', selectedBreed))
        const data = await response.json()
        // 最大10件に制限
        const limitedImages = data.message.slice(0, 10)
        setBreedImages(limitedImages)
        console.log('Breed images loaded:', limitedImages.length, 'images')
      } catch (error) {
        console.error('Error fetching breed images:', error)
      }
    }
    if (selectedBreed) {
      fetchBreedImages()
    }
  }, [selectedBreed])

  // 犬種選択時のハンドラー
  const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newBreed = event.target.value || null
    setSelectedBreed(newBreed)
    console.log('Selected breed:', newBreed)
  }

  return (
    <div className="dog-list">
      <BreedsSelect 
        breeds={breeds} 
        selectedBreed={selectedBreed} 
        handleBreedChange={handleBreedChange}
      />
      <div className="dog-img-wrapper">
        {breedImages.map((image) => (
          <img key={image} src={image} alt="犬種の画像" className="dog-img" />
        ))}
      </div>
    </div>
  )
}

export default DogListContainer