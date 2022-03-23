import React from 'react'
import { act } from 'react-test-renderer'
import { imageUrl, fetchMock } from './mock/fetch'
import { createAsync } from './utils/createAsync'

const { App } = require('../src/App') as { App: React.ComponentType<{}> }

describe('<App />', () => {
  const callback = {
    run: (_: string) => {},
  }

  const fetch = jest.fn()
  const useStateSpy = jest.spyOn(React, 'useState')

  window.fetch = fetch

  fetch.mockImplementation(fetchMock)

  useStateSpy.mockImplementation((value?: unknown) => {
    return [
      value,
      (value: string) => {
        callback.run(value)
      },
    ] as any
  })

  it('fetch() is called and the response value is used', async () => {
    const res = await createAsync(<App />)
    const img = res.root.findByType('img')
    const button = res.root.findByType('button')

    const initialImg = img.props.src
    expect(initialImg).not.toBeFalsy()

    const valuePromise = new Promise<string>((resolve) => {
      callback.run = value => resolve(value)
    })

    await act(async () => {
      button.props.onClick()
    })

    // wait React.useState to be called
    const value = await valuePromise

    expect(fetch).toBeCalled()
    expect(value).toStrictEqual(imageUrl)
  })
})
