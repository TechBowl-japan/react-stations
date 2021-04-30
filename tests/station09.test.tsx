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

  const useEffectSpy = jest.spyOn(React, 'useEffect')

  it('<RandomDogButton /> calls React.useEffect', async () => {
    await createAsync(<RandomDogButton />)
    expect(useEffectSpy).toBeCalled()
  })

  it('<RandomDogButton /> calls fetch', async () => {
    await createAsync(<RandomDogButton />)
    expect(fetch).toBeCalled()
  })
})
