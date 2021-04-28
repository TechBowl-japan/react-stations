import * as React from 'react'
import renderer from 'react-test-renderer'
import { App } from '../src/App'

it('<App /> has a <header>', () => {
  const res = renderer.create(
    <App />,
  )

  res.root.findByType('header')
})
