import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render, waitFor } from '@testing-library/react'
import { fetchMock } from './mock/fetch'

const React: typeof import('react') = await vi.importActual('react')

const useState = vi.fn()

vi.mock('react', () => {
  return {
    ...React,
    useState,
  }
})

const { App } = (await import('../src/App')) as { App: React.ComponentType<{}> }

describe('Station No.4', () => {
  const fetch = vi.fn()
  let setState: React.Dispatch<React.SetStateAction<unknown>> | undefined

  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

  beforeEach(() => {
    useState.mockImplementation((v?: unknown) => {
      const [value, dispatcher] = React.useState(v)
      setState = dispatcher
      return [value, dispatcher]
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('<App /> calls useState', async () => {
    await render(<App />)
    await waitFor(() => {
      expect(useState).toBeCalled()
    })
  })

  it('<img> uses a state value', async () => {
    const res = await render(<App />)
    const img = res.container.querySelector('img')
    const injectValue = 'http://localhost/doggo'

    if (img === null) {
      throw new Error('img is null')
    }

    expect(img.src).toBeTruthy()
    expect(useState).toBeCalledWith(img.src)

    useState.mockClear()

    act(() => {
      if (setState) {
        setState(injectValue)
      }
    })

    expect(img.src).toBe(injectValue)
  })
})
