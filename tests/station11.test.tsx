import * as React from 'react'
import { act } from 'react-test-renderer'
import { fetchMock } from './mock/fetch'
import { createAsync } from './utils/createAsync'

// TODO: ここのテストがあっているかを確認して修正を行う
// TODO: クリアしてほしい基準を決定→たたきを大木へ送る
// →問題文からみて決定する。もし現状の基準が難しそうなら、問題文自体を変更して構わない

const { App } = require('../src/App') as { App: React.ComponentType<{}> }
const { DogListContainer } = require('../src/DogListContainer') as {
  DogListContainer: React.ComponentType<{}>
}

describe('<DogListContainer />', () => {
  const fetch = jest.fn()
  window.fetch = fetch

  fetch.mockImplementation(fetchMock)

  it('has a button', async () => {
    const res = await createAsync(<DogListContainer />)
    const button = res.root.findAllByType('button')
    expect(button.length).toBeGreaterThan(0)
  })
})

describe('<App />', () => {
  const fetch = jest.fn()
  window.fetch = fetch

  fetch.mockImplementation(fetchMock)

  it("triggers `fetch()` when the '表示' or 'Show' button is clicked", async () => {
    const res = await createAsync(<App />)
    const buttons = res.root.findAllByType('button')
    const button = buttons.find(r =>
      (['表示', 'Show'] as any[]).includes(r.children[0]),
    )

    expect(button).toBeTruthy()

    if (!button) {
      return
    }

    await act(async () => {
      button.props.onClick()
    })

    expect(fetch).toBeCalled()
  })

  it('shows the list of image when the button is clicked', async () => {
    const res = await createAsync(<App />)
    const container = res.root.findByType(DogListContainer)

    expect(container).toBeTruthy()

    const button = container!.findByType('button')

    await act(async () => {
      button.props.onClick()
    })

    expect(fetch).toBeCalled()
    const imgList = res.root.findAllByType('img')
    expect(imgList.length).toBeGreaterThan(0)
  })
})
