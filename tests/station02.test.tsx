import * as React from 'react'
import renderer, { act } from 'react-test-renderer'
import { fetchMock } from './mock/fetch'
import { createAsync } from './utils/createAsync'

const { App } = require('../src/App') as { App: React.ComponentType<{}> }

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
