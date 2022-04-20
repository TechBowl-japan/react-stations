import React from 'react'

export const BreedsSelect = props => {
  const breeds = props.breeds
  const bogNameList = breeds.map(dog => (
    <option key={dog} value={dog} text={dog}>
      {dog}
    </option>
  ))

  const dogImages = props.selectedDog

  const dogImageList = dogImages.map(dogimg => (
    <div key={dogimg}>
      <img
        key={dogimg}
        src={dogimg}
        className="doglist-images"
        alt="選択した犬の写真"
      ></img>
    </div>
  ))

  return (
    <>
      <section className="container">
        <form onChange={props.formSubmit}>
          <select value={props.value}>
            <option value="" selected>
              犬の種類
            </option>
            {bogNameList}
          </select>
          <button type="button" onClick={props.onClickImage} disabled={props.value === ''}>
            表示
          </button>
        </form>
        <div className="dogimage_container">{dogImageList}</div>
      </section>
    </>
  )
}
