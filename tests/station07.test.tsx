import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { compareColor } from './utils/compareColor'

const { App } = (await import('../src/App')) as { App: React.ComponentType<{}> }

describe('<App />', () => {
  it('<App /> has a <header>', async () => {
    const res = await render(<App />)
    expect(res.container.querySelector('header')).not.toBeNull()
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
