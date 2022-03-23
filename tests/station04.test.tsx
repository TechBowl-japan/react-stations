import React from 'react'
import { act } from 'react-test-renderer'
import { fetchMock } from './mock/fetch'
import { createAsync } from './utils/createAsync'

const { App } = require('../src/App') as { App: React.ComponentType<{}> }

describe('Station No.4', () => {
  const fetch = jest.fn()
  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

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

  it('<App /> calls useState', async () => {
    await createAsync(<App />)
    expect(useStateSpy).toBeCalled()
  })

  it('<img> uses a state value', async () => {
    const res = await createAsync(<App />)
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
