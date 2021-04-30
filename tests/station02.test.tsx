import * as React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'
import { App } from '../src/App'
import { fetchMock } from './mock/fetch'
import { createAsync } from './utils/createAsync'


describe('Station No.2', () => {
  const fetch = jest.fn()
  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

  it('Can create <App />', async () => {
    await act(async () => {
      renderer.create(<App />)
    })
  })

  it('<App /> has a <header>', async () => {
    const res = await createAsync(<App />)
    res.root.findByType('header')
  })
})
