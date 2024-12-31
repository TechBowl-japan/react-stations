// @ts-check
export const BreedsSelect = props => {
  const { breeds } = props

  //犬種一覧の配列をoptionに格納

  //ブルダウン選択時、 //selectタグ (jsk)onChange=""
  //selectedBreedに選択した犬種を更新
  // const onChangeBreed = () => {
  //   //ブルダウンで変更した犬種を取得
  //   //const changedBreed
  //   selectedbreed = changedBreed.value
  // }

  //valueの値定義
  // const chosenBreed = ''
  // const chooseBreed = () => {
  //   //optionのvalue値を取得
  //   const vl = document.querySelector('.breedSelectBox > option[]')

  //   document
  //     .getElementsByClassName('breedSelectBox')[0]
  //     .setAttribute('value', chosenBreed)

  //   //valueに初期値設定
  //   //onChangeBreed
  // }

  // const getSelectedBreed = () => {
  //   br = document.getElementsByClassName('breedSelectBox')[0].value
  // }

  return (
    <>
      <select
        name=""
        className="breedSelectBox"
        defaultValue={''}
        //onChange={getSelectedBreed}
      ></select>
    </>
  )
}

export default BreedsSelect
