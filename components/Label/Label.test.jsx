import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Label from './'

it('renders default information', () => {
  const { getByText, queryByTestId } = render(<Label text="Something" />)
  expect(getByText('Something')).toBeInTheDocument()
  expect(queryByTestId('close')).not.toBeInTheDocument()
})

it('renders close and calls onClose when close is pressed', () => {
  const handleClose = jest.fn()
  const { getByTestId } = render(
    <Label text="Something" onClose={handleClose} />
  )

  fireEvent.click(getByTestId('close'))
  expect(handleClose).toHaveBeenCalledTimes(1)
  expect(handleClose).toHaveBeenCalledWith()
})
