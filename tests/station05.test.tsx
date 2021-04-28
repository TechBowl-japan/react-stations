import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { App } from '../src/App'

describe('<App />', () => {
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

  it('state changes when the button is clicked', () => {
    const res = renderer.create(<App />)
    const img = res.root.findByType('img')
    const button = res.root.findByType('button')

    const initialImg = img.props.src
    expect(initialImg).not.toBeFalsy()

    act(() => {
      button.props.onClick()
    })

    const changedImg = img.props.src
    expect(changedImg).not.toBeFalsy()

    expect(changedImg).not.toStrictEqual(initialImg)
  })
})
