// @ts-check

export const BreedsSelect = ({breeds, selectedBreeds, onBreedChange}) => {

  return (
  <div>
    <select value={selectedBreeds} onChange={onBreedChange}>
      <option value="test"></option>
      {breeds &&
      Object.keys(breeds).map((breeds) => (
        <option key={breeds} value={breeds}>{breeds}</option>
      ))}
    </select>
  </div>
  )
}

export default BreedsSelect
