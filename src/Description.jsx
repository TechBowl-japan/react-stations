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
        <button className="primaryBtn" onClick={onClickUrl}>
          change URL
        </button>
      </div>
    </>
  )
}

export default Description
