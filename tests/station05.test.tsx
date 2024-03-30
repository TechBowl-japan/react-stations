import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, waitFor } from '@testing-library/react'
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

describe('Station No.5', () => {
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

  it('state changes when the button is clicked', async () => {
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

    fireEvent.click(button)


    await waitFor(() => {
      const changedImg = img.src

      expect(changedImg).not.toBeFalsy()

      expect(changedImg).not.toStrictEqual(initialImg)
    })

  })
})
