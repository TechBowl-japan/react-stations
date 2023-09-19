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

    // NOTE: 非同期処理等でselectおよびoptionタグが存在しない場合があるため、waitForを使用する
    await waitFor(() => {
      expect(res.container.querySelectorAll('select').length).not.toBe(0)
      expect(res.container.querySelectorAll('option').length).not.toBe(0)
    })
  })
})

describe('<App />', () => {
  it('value changes when `onChange` was called', async () => {
    const { App } = await import('../src/App')
    const res = await render(<App />)

    // NOTE: 非同期処理等でselectおよびoptionタグが存在しない場合があるため、waitForを使用する
    const selectTag = await waitFor(
      () => res.container.querySelector('select')!,
    )
    const optionTags = await waitFor(() => {
      const options = res.container.querySelectorAll('option')
      if (options.length === 0) {
        throw new Error('optionタグが存在しません')
      } else if (options.length === 1 && options[0].value === '') {
        throw new Error('有効な選択肢が存在しません')
      }

      return options
    })

    // NOTE: 1つ目の選択肢がplaceholder (value="")の場合があることの考慮
    const selectedOptionValue = optionTags[0]?.value || optionTags[1]?.value

    expect(selectTag, 'select tagが存在すること').toBeTruthy()
    expect(optionTags, 'option tagが存在すること').toBeTruthy()

    await fireEvent.change(selectTag, {
      target: { value: selectedOptionValue },
    })
    await waitFor(() => {
      expect(
        selectTag.value,
        'optionタグにおいて特定のタグが選択されている状態にできること',
      ).toBe(selectedOptionValue)
    })
  })
})
