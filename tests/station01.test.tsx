import * as React from 'react'
import renderer from 'react-test-renderer'
import { App } from '../src/App'

it('Can create <App />', () => {
  renderer.create(
    <App />,
  )
})
