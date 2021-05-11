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

  it('value changes when `onChange` wes called', async () => {
    const { BreedsSelect } = require('../src/BreedsSelect')
    const mock = jest.fn()
    const res = await createAsync(<BreedsSelect handleSelectBreed={mock} breeds={breeds} />)
    const selectTag = res.root.findByType('select')!
    const value = 'test'
  
    expect(selectTag).toBeTruthy()
    selectTag.props.onChange({ target: { value } })
    expect(mock).toBeCalledWith(value)
  })
})
