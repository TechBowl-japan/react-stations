import * as React from 'react'
import { fetchMock } from './mock/fetch'
import { createAsync } from './utils/createAsync'

const { App } = require('../src/App') as { App: React.ComponentType<{}> }

describe('Station No.3', () => {
  const fetch = jest.fn()
  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

  it('<App /> has a <header>', async () => {
    const res = await createAsync(<App />)
    res.root.findByType('header')
  })

  it('<App /> contains a text node', async () => {
    const res = await createAsync(<App />)

    let hasChildTextNode = false
    let stack = [...res.root.children]

    // run a depth-first search for a text node
    while (stack.length !== 0 && !hasChildTextNode) {
      const child = stack.pop()
      if (child === undefined) {
        throw new Error('unreachable code')
      }

      if ((hasChildTextNode = typeof child === 'string')) {
        break
      }

      const children = child.children
      if (children.length === 0) {
        continue
      }

      stack = [...children, ...stack]
    }

    expect(hasChildTextNode).toBe(true)
  })

  it('<App /> has a <img> with src', async () => {
    const res = await createAsync(<App />)

    const img = res.root.findByType('img')
    expect(img.props.src).toBeTruthy()
  })
})
