// @ts-check
type Props = {
  imageUrl: string
}

export const DogImage = ({imageUrl}: Props) => {
  return <img src={imageUrl} alt="犬の画像" className='dog-img' />
}

export default DogImage