import * as React from 'react'
import renderer from 'react-test-renderer'
import { App } from '../src/App'

it('<App /> has a <header>', () => {
  const res = renderer.create(
    <App />,
  )

  res.root.findByType('header')
})

it('<App /> contains a text node', () => {
  const res = renderer.create(<App />)

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

it('<App /> has a <img> with src', () => {
  const res = renderer.create(<App />)

  const img = res.root.findByType('img')
  expect(img.props.src).toBeTruthy()
})
