import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { App } from '../src/App'


describe('<App />', () => {
  let setState: React.Dispatch<unknown> | undefined = undefined
  const useState = React.useState
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((v?: unknown) => {
    const [value, dispatcher] = useState(v)
    setState = dispatcher
    return [value, dispatcher]
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('<App /> calls useState', () => {
    renderer.create(<App />)

    expect(useStateSpy).toBeCalled()
  })

  it('<img> uses a state value', () => {
    const res = renderer.create(<App />)
    const img = res.root.findByType('img')
    const injectValue = '🐕'

    expect(img.props.src).toBeTruthy()
    expect(useStateSpy).toBeCalledWith(img.props.src)

    useStateSpy.mockClear()
    
    expect(setState).not.toBeUndefined()

    act(() => {
      if (setState) {
        setState(injectValue)
      }
    })

    expect(img.props.src).toBe(injectValue)
  })
})
