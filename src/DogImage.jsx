// @ts-check

export const DogImage = props => {
  const { imageUrl } = props

  return (
    <>
      <img src={imageUrl} alt="dog" />
    </>
  )
}

export default DogImage
