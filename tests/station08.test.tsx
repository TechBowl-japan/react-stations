import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'
import { imageUrl, fetchMock } from './mock/fetch'

describe('<App />', () => {
  const fetch = jest.fn()
  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Can mount <App />', async () => {
    const { App } = require('../src/App')
    expect(App).toBeTruthy()
    await act(async () => {
      renderer.create(<App />)
    })
  })

  it('Can mount <Header />', () => {
    const { Header } = require('../src/Header')
    expect(Header).toBeTruthy()
    renderer.create(<Header />)
  })

  it('Can mount <Description />', () => {
    const { Description } = require('../src/Description')
    expect(Description).toBeTruthy()
    renderer.create(<Description />)
  })

  it('Can mount <RandomDogButton />', async () => {
    const { RandomDogButton } = require('../src/RandomDogButton')
    expect(RandomDogButton).toBeTruthy()
    await act(async () => {
      renderer.create(<RandomDogButton />)
    })
  })

  it('<RandomDogButton /> has a prop called `handleClickRandomButton` which is called with a image from API', async done => {
    const { RandomDogButton } = require('../src/RandomDogButton')
    expect(RandomDogButton).toBeTruthy()

    const mockHandler = jest.fn()
    mockHandler.mockImplementation((image: string) => {
      expect(image).toStrictEqual(imageUrl)
      done()
    })

    let res: ReactTestRenderer | undefined
    await act(async () => {
      res = renderer.create(
        <RandomDogButton handleClickRandomButton={mockHandler} />,
      )
    })

    if (!res) {
      throw new Error('failed to render')
    }

    const button = res.root.findByType('button')
    act(() => {
      button.props.onClick()
    })
  })

  it('<App /> contains <Header />, <Description />, <RandomDogButton />', async () => {
    const { App } = require('../src/App')
    const { Header } = require('../src/Header')
    const { Description } = require('../src/Description')
    const { RandomDogButton } = require('../src/RandomDogButton')

    let res: ReactTestRenderer | undefined
    await act(async () => {
      res = renderer.create(<App />)
    })

    if (!res) {
      throw new Error('failed to render')
    }

    res.root.findByType(Header)
    res.root.findByType(Description)
    res.root.findByType(RandomDogButton)
  })
})
