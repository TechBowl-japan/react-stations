// DO NOT DELETE
import React from 'react';
// import Select from 'react-select';

export const BreedsSelect = (props) => {
  const breeds = props.breeds;
  // console.log(breeds);
  const bogNameList = breeds.map((dog) =>
    <option key={dog} value={dog} text={dog} id={dog}>{dog}</option>
  )
  const dogImages = props.selectedDog
  const dogImageList = dogImages.map((dogimg) =>
  <img key={dogimg} src={dogimg} alt ='選択した犬の写真'></img>
  )



	return(
    <>
    <form onChange={props.formSubmit}>
      <select value={props.value}>
        <option value="" selected>犬</option>
        {bogNameList}
      </select>
      <button type="button" onClick={props.onClickImage}>表示</button>
    </form>
    {dogImageList}
    </>
  )
}


