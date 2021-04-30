import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { RandomDogButton } from '../src/RandomDogButton'
import { breeds, fetchMock } from './mock/fetch'
import { createAsync } from './utils/createAsync'

const breedsList = Object.keys(breeds)

describe('<App />', () => {
  const fetch = jest.fn()
  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

  it('<RandomDogButton /> contains list of breeds', async () => {
    const res = await createAsync(<RandomDogButton />)

    const breedsSet = new Set(breedsList)
    const options = res.root.findAllByType('option')

    // there might be "All breeds" options
    options.forEach((o) => {
      const b = o.props.value
      if (b) {
        expect(breedsSet.has(b)).toBeTruthy()
        breedsSet.delete(b)
      }
    })

    expect(breedsSet.size).toStrictEqual(0)
  })
})
