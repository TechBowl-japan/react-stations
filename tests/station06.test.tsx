import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { fetchMock, imageUrl } from './mock/fetch'

const React: typeof import('react') = await vi.importActual('react')

const useState = vi.fn()

vi.mock('react', () => {
  return {
    ...React,
    useState,
  }
})

const { App } = (await import('../src/App')) as { App: React.ComponentType<{}> }

describe('<App />', () => {
  const fetch = vi.fn()
  const setStateMock = vi.fn()

  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

  beforeEach(() => {
    useState.mockImplementation((v?: unknown) => {
      const [value, dispatcher] = React.useState(v)
      return [
        value,
        (value: unknown) => {
          setStateMock(value)
          return dispatcher(value)
        },
      ]
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('fetch() is called and the response value is used', async () => {
    const res = await render(<App />)
    const img = res.container.querySelector('img')
    const button = res.container.querySelector('button')

    if (img === null) {
      throw new Error('img is null')
    }

    if (button === null) {
      throw new Error('button is null')
    }

    const initialImg = img.src
    expect(initialImg).not.toBeFalsy()

    await act(() => {
      fireEvent.click(button)
    })

    // wait React.useState to be called
    await waitFor(() => {
      expect(fetch).toBeCalled()
      expect(setStateMock).toBeCalledWith(imageUrl)
    })
  })
})
