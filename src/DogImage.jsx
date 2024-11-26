// @ts-check
export const DogImage = (/** @type {{ imageUrl: string | undefined; }} */ props) => {
  return (
    <>
      <img className='dog-img' src={props.imageUrl} alt='犬の画像' />
    </>
  )
}

export default DogImage
