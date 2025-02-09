// @ts-check
import { DogImage } from './DogImage'

type Props = {
  imageUrl: string
  imgUpdate: () => void
  imgReset: () => void
}

export const Description = ( {imageUrl, imgUpdate, imgReset} : Props ) => {
  return (
    // <> </>はReactフラグメントと呼ばれるもので、複数の要素をまとめて返すことができる
    <>
      <p>犬の画像を表示するサイトです</p>
      <div className='dog-img-wrapper'>
        <DogImage imageUrl={imageUrl} />
      </div>
      <div className='btn-wrapper'>
        <button onClick={imgUpdate}>更新</button>
        <button onClick={imgReset}>戻す</button>
      </div>
    </>
  )
}

export default Description
