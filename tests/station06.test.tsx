import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { App } from '../src/App'

describe('<App />', () => {
  const callback = {
    run: (_: string) => {},
  }

  const fetchSpy = jest.spyOn(window, 'fetch')
  const useStateSpy = jest.spyOn(React, 'useState')

  useStateSpy.mockImplementation((value?: unknown) => {
    return [
      value,
      (value: string) => {
        callback.run(value)
      },
    ] as any
  })

  it('setState is called with a random value', async done => {
    const res = renderer.create(<App />)
    const img = res.root.findByType('img')
    const button = res.root.findByType('button')

    const initialImg = img.props.src
    expect(initialImg).not.toBeFalsy()

    callback.run = (value: string) => {
      try {
        expect(fetchSpy).toBeCalled()
        expect(value).not.toStrictEqual(initialImg)
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
