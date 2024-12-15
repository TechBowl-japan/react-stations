// @ts-check

export const DogImage = props => {
  const { imageUrl } = props
  //console.log('DogImage URL:', url) // 渡されている URL を確認

  return (
    <>
      <img src={imageUrl} alt="dog" />
    </>
  )
}

export default DogImage
