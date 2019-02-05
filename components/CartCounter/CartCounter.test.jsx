import React from 'react'
import { fireEvent, render } from 'react-testing-library'
import CartCounter from './CartCounter'

it('should render a cart by default', () => {
  const { getByTitle } = render(<CartCounter />)
  expect(getByTitle('add to cart')).toBeInTheDocument()
})

it('should render a cart with default value', () => {
  const { getByText } = render(<CartCounter defaultValue={4} />)
  expect(getByText('4')).toBeInTheDocument()
})

it('clicking on cart should render counter of value 1', () => {
  const { getByTitle, getByText } = render(<CartCounter />)

  fireEvent.click(getByTitle('add to cart'))

  expect(getByText('-')).toBeInTheDocument()
  expect(getByText('+')).toBeInTheDocument()
  expect(getByText('1')).toBeInTheDocument()
})

it('should show the cart when counter drop to 0', () => {
  const { getByText, getByTitle } = render(<CartCounter defaultValue={1} />)
  fireEvent.click(getByText('-'))
  expect(getByTitle('add to cart')).toBeInTheDocument()
})

it('should call onValueChange when value changes', () => {
  const handleValueChange = jest.fn()
  const { getByTitle, getByText } = render(
    <CartCounter onValueChange={handleValueChange} />
  )

  fireEvent.click(getByTitle('add to cart'))
  expect(handleValueChange).toHaveBeenCalledTimes(1)

  handleValueChange.mockClear()
  fireEvent.click(getByText('+'))
  expect(handleValueChange).toHaveBeenCalledTimes(1)
  expect(handleValueChange).toHaveBeenCalledWith({
    nextValue: 2,
    prevValue: 1,
    delta: 1,
  })

  handleValueChange.mockClear()
  fireEvent.click(getByText('-'))
  expect(handleValueChange).toHaveBeenCalledTimes(1)
  expect(handleValueChange).toHaveBeenCalledWith({
    nextValue: 1,
    prevValue: 2,
    delta: -1,
  })
})
