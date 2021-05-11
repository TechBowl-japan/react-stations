import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { breeds as nestedBreeds, fetchMock } from './mock/fetch'
import { createAsync } from './utils/createAsync'

const breeds = Object.keys(nestedBreeds)

describe('<BreedsSelect />', () => {
  const fetch = jest.fn()

  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

  it('exists', async () => {
    const { BreedsSelect } = require('../src/BreedsSelect')
    expect(BreedsSelect).toBeTruthy()
    await act(async () => {
      renderer.create(<BreedsSelect breeds={breeds} />)
    })
  })

  it('has `<select>` and `<option>` tags', async () => {
    const { BreedsSelect } = require('../src/BreedsSelect')
    const res = await createAsync(<BreedsSelect breeds={breeds} />)
    expect(res.root.findAllByType('select').length).not.toBe(0)
    expect(res.root.findAllByType('option').length).not.toBe(0)
  })
})

describe('<App />', () => {
  it('value changes when `onChange` wes called', async () => {
    const { App } = require('../src/App')
    const res = await createAsync(<App />)
    const selectTag = res.root.findByType('select')!
    const value = 'test'

    expect(selectTag).toBeTruthy()
    act(() => {
      selectTag.props.onChange({ target: { value } })
    })
    expect(selectTag.props.value).toBe(value)
  })
})
