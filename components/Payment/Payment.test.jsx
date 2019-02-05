import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Payment from './Payment'

it('should render a compact payment component', () => {
  const { getByText } = render(<Payment />)

  expect(getByText('Credit Card')).toBeInTheDocument()
})

it('on clicking on remove icon should enable remove card popup', () => {
  const { getByText, getByTestId, queryByTestId } = render(<Payment />)
  fireEvent.click(getByTestId('removeCard'))
  expect(getByTestId('confirmationNotification')).toBeInTheDocument()
  fireEvent.click(getByText('Yes'))
  expect(queryByTestId('confirmationNotification')).not.toBeInTheDocument()
})

it('on clicking on card should enable edit card popup', () => {
  const { getByText, getByTestId } = render(<Payment />)
  fireEvent.click(getByText('Credit Card'))
  expect(getByTestId('editPayment')).toBeInTheDocument()
  fireEvent.click(getByText('Done'))
})

it('on clicking shoud enable add card popup', () => {
  const { getByText, getByTestId } = render(<Payment />)
  fireEvent.click(getByText('+'))
  expect(getByTestId('editPayment')).toBeInTheDocument()
})
