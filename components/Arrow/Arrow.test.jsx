import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Arrow from './Arrow'

it('should call the onclick function', () => {
  const onClick = jest.fn()
  const { getByTestId } = render(<Arrow onClick={onClick} />)

  fireEvent.click(getByTestId('arrow'))
  expect(onClick).toHaveBeenCalledTimes(1)
})
