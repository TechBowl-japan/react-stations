import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { fetchMock } from './mock/fetch'

const { App } = (await import('../src/App')) as { App: React.ComponentType<{}> }

describe('Station No.1', () => {
  const fetch = vi.fn()
  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

  it('Can create <App />', async () => {
    const { container } = render(<App />)
    expect(container).toBeTruthy()
  })
})
