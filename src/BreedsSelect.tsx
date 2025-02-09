// @ts-check
type Props = {
  breeds: string[]
}

export const BreedsSelect = ({ breeds }: Props) => {
  return (
    <>
      <h2>犬種一覧</h2>
      <select>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>
    </>
  )
}

export default BreedsSelect
