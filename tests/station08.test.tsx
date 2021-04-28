import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { mockResponse, imageUrl } from './mock/fetch'

describe('<App />', () => {
  const fetch = jest.fn()

  window.fetch = fetch

  fetch.mockImplementation((resource, ..._) => {
    const url = typeof resource === 'string' ? resource : resource.url
    return Promise.resolve({
      ...mockResponse,
      url,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Can mount <App />', () => {
    const { App } = require('../src/App')
    expect(App).toBeTruthy()
    renderer.create(<App />)
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

  it('Can mount <RandomDogButton />', () => {
    const { RandomDogButton } = require('../src/RandomDogButton')
    expect(RandomDogButton).toBeTruthy()
    renderer.create(<RandomDogButton />)
  })

  it('<RandomDogButton /> has a prop called `handleClickRandomButton` which is called with a image from API', async done => {
    const { RandomDogButton } = require('../src/RandomDogButton')
    expect(RandomDogButton).toBeTruthy()

    const mockHandler = jest.fn()
    mockHandler.mockImplementation((image: string) => {
      expect(image).toStrictEqual(imageUrl)
      done()
    })
    const res = renderer.create(
      <RandomDogButton handleClickRandomButton={mockHandler} />,
    )

    const button = res.root.findByType('button')
    act(() => {
      button.props.onClick()
    })
  })

  it('<App /> contains <Header />, <Description />, <RandomDogButton />', () => {
    const { App } = require('../src/App')
    const { Header } = require('../src/Header')
    const { Description } = require('../src/Description')
    const { RandomDogButton } = require('../src/RandomDogButton')

    const res = renderer.create(<App />)
    res.root.findByType(Header)
    res.root.findByType(Description)
    res.root.findByType(RandomDogButton)
  })
})
