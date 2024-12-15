// @ts-check
import DogImage from './DogImage'
export const Description = props => {
  const { dogUrl, onClickUrl } = props
  console.log('dogUrl:', dogUrl) // 現在の画像 URL を確認
  return (
    <>
      <p>サイトの説明</p>
      <div>{/* <DogImage /> */}</div>
      <div>
        <DogImage imageUrl={dogUrl} />
      </div>
      <button onClick={onClickUrl}>change URL</button>
    </>
  )
}

export default Description
