// @ts-check
import DogImage from './DogImage'
export const Description = props => {
  const { dogUrl, onClickUrl } = props

  return (
    <>
      <p>サイトの説明</p>
      <div>{/* <DogImage /> */}</div>
      <div>
        <DogImage imageUrl={dogUrl} />
      </div>
      <div>
        <div className="primaryBtn" onClick={onClickUrl}>
          更新
        </div>
      </div>
    </>
  )
}

export default Description
