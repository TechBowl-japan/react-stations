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

  it('Can mount <DogImage />', async () => {
    const { DogImage } = require('../src/DogImage')
    expect(DogImage).toBeTruthy()
    await act(async () => {
      renderer.create(<DogImage />)
    })
  })

  it('<DogImage /> has a prop called `url`', async () => {
    const { DogImage } = require('../src/DogImage')
    expect(DogImage).toBeTruthy()

    let res: ReactTestRenderer | undefined
    await act(async () => {
      res = renderer.create(
        <DogImage url={imageUrl} />,
      )
    })

    const dogImage = res?.root.findByType('img')
    expect(dogImage).toBeTruthy()
    expect(dogImage?.props.src).toStrictEqual(imageUrl)
  })

  it('<App /> contains <Header />, <Description />, <DogImage />', async () => {
    const { App } = require('../src/App')
    const { Header } = require('../src/Header')
    const { Description } = require('../src/Description')
    const { DogImage } = require('../src/DogImage')

    let res: ReactTestRenderer | undefined
    await act(async () => {
      res = renderer.create(<App />)
    })

    if (!res) {
      throw new Error('failed to render')
    }

    res.root.findByType(Header)
    res.root.findByType(Description)
    res.root.findByType(DogImage)
  })
})
