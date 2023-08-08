import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { imageUrl, fetchMock } from './mock/fetch'
import { create } from 'react-test-renderer'

describe('<App />', () => {
  const fetch = vi.fn()
  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Can mount <App />', async () => {
    const { App } = await import('../src/App')
    expect(App).toBeTruthy()
    const res = await render(<App />)
    expect(res.container).toBeTruthy()
  })

  it('Can mount <Header />', async () => {
    const { Header } = await import('../src/Header')
    expect(Header).toBeTruthy()
    const res = await render(<Header />)
    expect(res.container).toBeTruthy()
  })

  it('Can mount <Description />', async () => {
    const { Description } = await import('../src/Description')
    expect(Description).toBeTruthy()
    const res = await render(<Description />)
    expect(res.container).toBeTruthy()
  })

  it('Can mount <DogImage />', async () => {
    const { DogImage } = await import('../src/DogImage')
    expect(DogImage).toBeTruthy()
    const res = await render(<DogImage imageUrl={imageUrl} />)
    expect(res.container).toBeTruthy()
  })

  it('<DogImage /> has a prop called `url`', async () => {
    const { DogImage } = await import('../src/DogImage')
    expect(DogImage).toBeTruthy()

    let res = await render(<DogImage imageUrl={imageUrl} />)

    const dogImage = res.container.querySelector('img')

    expect(dogImage).toBeTruthy()
    expect(dogImage!.src).toStrictEqual(imageUrl)
  })

  it('<App /> contains <Header />, <Description />, <DogImage />', async () => {
    // TODO: Promise.allを使う

    const { App } = await import('../src/App')
    const { Header } = await import('../src/Header')
    const { Description } = await import('../src/Description')
    const { DogImage } = await import('../src/DogImage')

    const res = create(<App />)

    if (!res) {
      throw new Error('failed to render')
    }

    expect(res.root.findByType(Header)).toBeTruthy()
    expect(res.root.findByType(Description)).toBeTruthy()
    expect(res.root.findByType(DogImage)).toBeTruthy()
  })
})
