import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { fetchMock } from './mock/fetch'

const React: typeof import('react') = await vi.importActual('react')

const useState = vi.fn()

vi.mock('react', () => {
  return {
    ...React,
    useState,
  }
})

describe('<DogListContainer />', () => {
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

  it('exists', async () => {
    const { DogListContainer } = await import('../src/DogListContainer')
    expect(DogListContainer).toBeTruthy()

    const res = await render(<DogListContainer />)
    expect(res.container).toBeTruthy()
  })

  it('calls `fetch`', async () => {
    const { DogListContainer } = await import('../src/DogListContainer')
    await render(<DogListContainer />)

    await waitFor(() => {
      expect(fetch).toBeCalled()
    })
  })

  it('calls `useState`', async () => {
    const { DogListContainer } = await import('../src/DogListContainer')
    await render(<DogListContainer />)

    await waitFor(() => {
      expect(fetch).toBeCalled()
    })
  })
})
