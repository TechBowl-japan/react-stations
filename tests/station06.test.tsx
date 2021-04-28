import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { App } from '../src/App'
import { imageUrl, fetchMock } from './mock/fetch'

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

  it('fetch() is called and the response value is used', async done => {
    const res = renderer.create(<App />)
    const img = res.root.findByType('img')
    const button = res.root.findByType('button')

    const initialImg = img.props.src
    expect(initialImg).not.toBeFalsy()

    callback.run = (value: string) => {
      try {
        expect(fetch).toBeCalled()
        expect(value).toStrictEqual(imageUrl)
        done()
      } catch (e) {
        done.fail(e)
      }
    }

    act(() => {
      button.props.onClick()
    })
  })
})
