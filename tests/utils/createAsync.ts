import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

export const createAsync = async (
  ...args: Parameters<typeof renderer.create>
): Promise<ReactTestRenderer> => {
  let res = null as ReactTestRenderer | null

  await act(async () => {
    res = renderer.create(...args)
  })

  if (res === null) {
    throw new Error('failed to render')
  }

  return res
}
