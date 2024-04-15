import { fireEvent, render, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { fetchMock } from './mock/fetch'

const { App } = (await import('../src/App')) as { App: React.ComponentType<{}> }
const { DogListContainer } = (await import('../src/DogListContainer')) as {
  DogListContainer: React.ComponentType<{}>
}

describe('<DogListContainer />', () => {
  const fetch = vi.fn()
  window.fetch = fetch

  fetch.mockImplementation(fetchMock)

  it('has a button', async () => {
    const res = await render(<DogListContainer />)
    const button = res.container.querySelectorAll('button')
    expect(button.length).toBeGreaterThan(0)
  })
})

describe('<App />', () => {
  const fetch = vi.fn()
  window.fetch = fetch

  fetch.mockImplementation(fetchMock)

  it("triggers `fetch()` when the '表示' or 'Show' button is clicked", async () => {
    const res = await render(<App />)
    const buttons = Array.from(res.container.querySelectorAll('button'))
    const button = buttons.find(r =>
      (['表示', 'Show'] as any[]).includes(r.innerHTML?.trim() ?? ''),
    )

    expect(button).toBeTruthy()

    if (!button) {
      return
    }

    await fireEvent.click(button)

    expect(fetch).toBeCalled()
  })

  it('shows the list of image when the button is clicked', async () => {
    const res = await render(<App />)
    const buttons = Array.from(res.container.querySelectorAll('button'))
    const button = buttons.find(r =>
      (['表示', 'Show'] as any[]).includes(r.innerHTML?.trim() ?? ''),
    )

    expect(button).toBeTruthy()

    if (!button) {
      return
    }
    expect(fireEvent.click(button)).toBeTruthy()

    expect(fetch).toBeCalled()
    await waitFor(() => {
      const imgList = res.container.querySelectorAll('img')
      expect(imgList.length).toBeGreaterThan(1)
      imgList.forEach((img) => {
        expect(img.src).not.toBe('');
      })
    })
  })
})
