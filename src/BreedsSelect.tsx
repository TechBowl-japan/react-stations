// @ts-check
type Props = {
  breeds: string[]
  selectedBreed: string | null
  handleBreedChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const BreedsSelect = ({ breeds, selectedBreed, handleBreedChange }: Props) => {
  return (
    <div className="breeds-select">
      <h2>犬種一覧</h2>
      <select value={selectedBreed || ''} onChange={handleBreedChange}>
        <option value="">犬種を選択してください</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    </div>
  )
}

export default BreedsSelect
