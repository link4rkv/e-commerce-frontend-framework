import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Button from './'

it('renders the children', () => {
  const { getByText } = render(<Button>Something</Button>)
  expect(getByText(/Something/)).toBeInTheDocument()
})

it('should call onClick when pressed', () => {
  const handleClick = jest.fn()
  const { getByText } = render(<Button onClick={handleClick}>Something</Button>)
  fireEvent.click(getByText('Something'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
