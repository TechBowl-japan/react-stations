// DO NOT DELETE
import React from "react";
import { useEffect, useState } from "react";
import { BreedsSelect } from "./BreedsSelect";

export const DogListContainer = () => {
  const [breeds,setBreeds] = useState([]); //犬種一覧を取得する
  const [selectedBreed,setSelectedBreed] = useState(); // 選択した犬種を保持
  const [selectedDog,setSelectedDog] = useState([]);// 選択した犬の画像

const test = ((e)=> {
  e.preventDefault();
  console.log(e.target.value)
  setSelectedBreed(e.target.value)
  })

  const test2 =(()=>{
    fetch('https://dog.ceo/api/breed/'+selectedBreed+'/images/random/12')
    .then((res) => res.json())
    .then((json) => {
      setSelectedDog(json.message)
      if(!json.status === 'success'){
        console.log('no data found')
          // throw new Error('no data found');
        }
      })
  })

  useEffect (() => {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then((json)=> {
      // console.log(json.message);
      return setBreeds(Object.keys(json.message));
    })
  },[])

	return(
    <>
      <BreedsSelect breeds={breeds}
      value={selectedBreed}
      formSubmit={test}
      onClickImage={test2}
      selectedDog={selectedDog}

    />

    </>
	)
}
