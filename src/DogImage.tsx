// @ts-check
type Props = {
  dogurl: string
}

export const DogImage = ({dogurl}: Props) => {
  return <img src={dogurl} alt="犬の画像" className='dog-img' />
}

export default DogImage
