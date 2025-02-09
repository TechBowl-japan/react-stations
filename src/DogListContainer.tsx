// @ts-check
type Props = {
  [key: string]: string[]
}

export const DogListContainer = ( {dogList} : Props ) => {
  return (
    <div className="dog-list">
      <h2>犬種リスト</h2>
      <ul>
        {Object.keys(dogList).map((breed) => (
          <li key={breed}>{breed}</li>
        ))}
      </ul>
    </div>
  )
}

export default DogListContainer