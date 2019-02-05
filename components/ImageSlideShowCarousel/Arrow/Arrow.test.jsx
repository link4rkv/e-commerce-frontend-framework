import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Arrow from './'

it('should call the onclick function', () => {
  const onClick = jest.fn()
  const { getByTestId } = render(<Arrow clickFunction={onClick} />)

  fireEvent.click(getByTestId('arrow'))
  expect(onClick).toHaveBeenCalledTimes(1)
})
