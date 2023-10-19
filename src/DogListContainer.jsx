// @ts-check
import { useState } from "react"
import { useEffect } from "react"
import {BreedsSelect} from "./BreedsSelect.jsx"

export const DogListContainer = () => {

  const [breeds, setBreeds] = useState([])
  const [selectedBreed, setSelectedBreed] = useState('')
  const [multiDogUrls, setMultiDogUrl] = useState([]);

  function handleSelectChange(e) {
    setSelectedBreed(e.target.value)
  }

  function displayImg() {
    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/2`)
      .then(res => res.json())
      .then(
        (result) => {
          setMultiDogUrl(result.message)
        }
      )
    console.log(multiDogUrls)
  }

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(res => res.json())
      .then(
        (result) => {
          setBreeds(result.message)
        }
      )
  })
  
  return (
  <div>
    <BreedsSelect breeds={breeds} selectedBreeds={selectedBreed} onBreedChange={handleSelectChange} />
    <button onClick={() => displayImg()}>表示</button>
    <div>
      {multiDogUrls.map(dogUrl => (
        <img src={dogUrl}></img>
      ))}
    </div>
  </div>
  )
}

export default DogListContainer
