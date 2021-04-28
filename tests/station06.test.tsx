import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { App } from '../src/App'

const imageUrl = 'https://avatars.githubusercontent.com/u/298748'
const mockServerResponse = {
  message: imageUrl,
  status: 'success',
}
const mockResponse: Response = {
  headers: {} as any,
  ok: true,
  redirected: false,
  status: 200,
  statusText: 'OK',
  trailer: {} as any,
  type: 'default',
  body: null,
  url: '',
  bodyUsed: false,
  arrayBuffer() {
    throw new Error('unimplemented; You are doing something wrong.')
  },
  blob() {
    throw new Error('unimplemented; You are doing something wrong.')
  },
  formData() {
    throw new Error('unimplemented; You are doing something wrong.')
  },
  json() {
    return Promise.resolve(JSON.parse(JSON.stringify(mockServerResponse)))
  },
  text() {
    return Promise.resolve(JSON.stringify(mockServerResponse))
  },
  clone() {
    throw new Error('unimplemented; You are doing something wrong.')
  },
}

describe('<App />', () => {
  const callback = {
    run: (_: string) => {},
  }

  const fetch = jest.fn()
  const useStateSpy = jest.spyOn(React, 'useState')

  window.fetch = fetch

  fetch.mockImplementation((resource, ..._) => {
    const url = typeof resource === 'string' ? resource : resource.url
    return Promise.resolve({
      ...mockResponse, url,
    })
  })

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
