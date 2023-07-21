import { describe, expect, it, vi } from 'vitest'
import * as React from 'react'
import { fetchMock } from './mock/fetch'
import { render, waitFor } from '@testing-library/react'

const { App } = (await import('../src/App')) as { App: React.ComponentType<{}> }

describe('Station No.3', () => {
  const fetch = vi.fn()
  window.fetch = fetch
  fetch.mockImplementation(fetchMock)

  it('<App /> has a <header>', async () => {
    const res = await render(<App />)
    const header = res.container.querySelector('header')

    await waitFor(() => {
      expect(header).not.toBeNull()
    })
  })

  it('<App /> contains a text node', async () => {
    const res = await render(<App />)

    let hasChildTextNode = false
    let stack = Array.from(res.container.childNodes)

    // run a depth-first search for a text node
    while (stack.length !== 0 && !hasChildTextNode) {
      const child = stack.pop()
      if (child === undefined) {
        throw new Error('unreachable code')
      }

      if ((hasChildTextNode = child instanceof Text)) {
        break
      }

      const children = child.childNodes
      if (children.length === 0) {
        continue
      }

      stack = [...Array.from(children), ...stack]
    }

    expect(hasChildTextNode).toBe(true)
  })

  it('<App /> has a <img> with src', async () => {
    const res = await render(<App />)

    const img = res.container.querySelector('img')
    expect(img).not.toBeNull()
    expect(img!.src).toBeTruthy()
  })
})
