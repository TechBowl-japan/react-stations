import React from 'react'
import renderer, { act } from 'react-test-renderer'
import { RandomDogButton } from '../src/RandomDogButton'
import { imageUrl, fetchMock } from './mock/fetch'

describe('<App />', () => {
  const useEffectSpy = jest.spyOn(React, 'useEffect')

  it('<RandomDogButton /> calls React.useEffect', () => {
    renderer.create(<RandomDogButton />)
    expect(useEffectSpy).toBeCalled()
  })
})
