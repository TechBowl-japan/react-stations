import * as React from 'react'
import renderer, { act } from 'react-test-renderer'
import { App } from '../src/App'
import { fetchMock } from './mock/fetch'

describe('Station No.1', () => {
  const fetch = jest.fn()
  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

  it('Can create <App />', async () => {
    await act(async () => {
      renderer.create(<App />)
    })
  })
})
