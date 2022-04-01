import { render } from '@testing-library/react'
import * as React from 'react'
import { createAsync } from './utils/createAsync'
import { compareColor } from './utils/compareColor'

const { App } = require('../src/App') as { App: React.ComponentType<{}> }

describe('<App />', () => {
  it('<App /> has a <header>', async () => {
    const res = await createAsync(<App />)
    res.root.findByType('header')
  })

  it('#F5F5F5 is specified as the background color of <header>', async () => {
    const { container } = render(<App />)
    const header = container.querySelector('header')

    if (!header) {
      throw new Error('a <header> does not exist')
    }

    expect(
      compareColor(window.getComputedStyle(header).backgroundColor, '#f5f5f5'),
    ).toBe(true)
  })
})
