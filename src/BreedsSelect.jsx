// @ts-check
const BreedsSelect = props => {
  const { breeds, selectedBreed } = props

  return (
    <>
      <select
        className="breedSelectBox"
        //breeds={breeds}
        defaultValue={''}
        onChange={selectedBreed}
      >
        <option value="" disabled>
          Select a breed
        </option>
        {breeds.map((breed, index) => (
          <option key={index} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    </>
  )
}

export default BreedsSelect
