import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { fetchMock } from './mock/fetch'
import { createAsync } from './utils/createAsync'

describe('<DogListContainer />', () => {
  const fetch = jest.fn()
  const useStateSpy = jest.spyOn(React, 'useState')

  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

  it('exists', async () => {
    const { DogListContainer } = require('../src/DogListContainer')
    expect(DogListContainer).toBeTruthy()
    await act(async () => {
      renderer.create(<DogListContainer />)
    })
  })

  it('calls `fetch`', async () => {
    const { DogListContainer } = require('../src/DogListContainer')
    await createAsync(<DogListContainer />)
    expect(fetch).toBeCalled()
  })

  it('calls `useState`', async () => {
    const { DogListContainer } = require('../src/DogListContainer')
    await createAsync(<DogListContainer />)
    expect(useStateSpy).toBeCalled()
  })
})
