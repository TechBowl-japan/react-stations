// @ts-check
import { useState } from 'react'

type Props = {
  dogBreeds: {[key: string]: string[]}
}

// 犬種リストの取得
export const DogListContainer = ({ dogBreeds }: Props) => {
  const [breeds, setBreeds] = useState<{[key: string]: string[]}>({})
  return (
    <div className="dog-list">
      <h2>犬種リスト</h2>
      <ul>
        {Object.keys(breeds).map((breed) => (
          <li key={breed}>{breed}</li>
        ))}
      </ul>
    </div>
  )
}

export default DogListContainer