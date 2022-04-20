import React from 'react'
import { useEffect, useState } from 'react'
import { BreedsSelect } from './BreedsSelect'

export const DogListContainer = () => {
  const [breeds, setBreeds] = useState([]); //犬種一覧を取得する
  const [selectedBreed, setSelectedBreed] = useState(''); // 選択した犬種を保持
  const [selectedDog, setSelectedDog] = useState([]); // 選択した犬の画像


  const formSubmit = e => {
    e.preventDefault()
    setSelectedBreed(e.target.value)
  }
  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => response.json())
      .then(json => {
        return setBreeds(Object.keys(json.message))
      })

  }, [])

  const breedDogs = () => {
    if (selectedBreed !== '') {
      fetch('https://dog.ceo/api/breed/' + selectedBreed + '/images/random/12')
        .then(res => res.json())
        .then(json => {
          setSelectedDog(json.message)
          if (!json.status === 'success') {
            console.log('no data found')
          }
        }
        )
    }
  }
  return (
    <>
      <div>
        <BreedsSelect
          breeds={breeds}
          value={selectedBreed}
          formSubmit={formSubmit}
          onClickImage={breedDogs}
          selectedDog={selectedDog}
        />
      </div>
    </>
  )
}
