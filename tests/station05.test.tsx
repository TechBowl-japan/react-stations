import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { fetchMock } from './mock/fetch'
import { createAsync } from './utils/createAsync'

const { App } = require('../src/App') as { App: React.ComponentType<{}> }

describe('Station No.5', () => {
  const fetch = jest.fn()
  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

  const useState = React.useState
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((v?: unknown) => useState(v))

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('<App /> calls useState', () => {
    renderer.create(<App />)

    expect(useStateSpy).toBeCalled()
  })

  it('state changes when the button is clicked', async () => {
    const res = await createAsync(<App />)
    const img = res.root.findByType('img')
    const button = res.root.findByType('button')

    const initialImg = img.props.src
    expect(initialImg).not.toBeFalsy()

    await act(async () => {
      button.props.onClick()
    })

    const changedImg = img.props.src
    expect(changedImg).not.toBeFalsy()

    expect(changedImg).not.toStrictEqual(initialImg)
  })
})
