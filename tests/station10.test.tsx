import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { fetchMock } from './mock/fetch'

const breeds = ['test', 'test2']

interface IBreedsSelect {
  BreedsSelect: (props: { breeds: string[] }) => JSX.Element
}

describe('<BreedsSelect />', () => {
  const fetch = vi.fn()

  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

  it('exists', async () => {
    const { BreedsSelect } = (await import(
      '../src/BreedsSelect'
    )) as IBreedsSelect
    expect(BreedsSelect).toBeTruthy()
    await render(<BreedsSelect breeds={breeds} />)
  })

  it('has `<select>` and `<option>` tags', async () => {
    const { BreedsSelect } = (await import(
      '../src/BreedsSelect'
    )) as IBreedsSelect
    const res = await render(<BreedsSelect breeds={breeds} />)
    expect(res.container.querySelectorAll('select').length).not.toBe(0)
    expect(res.container.querySelectorAll('option').length).not.toBe(0)
  })
})

describe('<App />', () => {
  it('value changes when `onChange` wes called', async () => {
    const { App } = await import('../src/App')
    const res = await render(<App />)
    const selectTag = res.container.querySelector('select')!
    const value = 'test'

    expect(selectTag).toBeTruthy()
    await fireEvent.change(selectTag, { target: { value } })

    await waitFor(() => {
      expect(selectTag.value).toBe(value)
    })
  })
})
