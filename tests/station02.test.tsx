import { describe, expect, it, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { fetchMock } from './mock/fetch'

const { App } = (await import('../src/App')) as { App: React.ComponentType<{}> }

describe('Station No.2', () => {
  const fetch = vi.fn()
  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

  it('Can create <App />', async () => {
    const res = await render(<App />)

    await waitFor(() => {
      expect(res.container).not.toBeNull()
    })
  })

  it('<App /> has a <header>', async () => {
    const res = await render(<App />)
    const header = res.container.querySelector('header')

    await waitFor(() => {
      expect(header).not.toBeNull()
    })
  })
})
