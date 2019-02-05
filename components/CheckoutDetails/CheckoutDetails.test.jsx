import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import CheckoutDetails from './CheckoutDetails'

it('Basic CheckoutDetails should be render', () => {
  const totalPrice = {
    currency: '$',
    amount: 245,
  }
  const { getByText, queryByText } = render(
    <CheckoutDetails totalPrice={totalPrice} />
  )

  expect(getByText('Subtotal')).toBeInTheDocument()
  expect(getByText('$245')).toBeInTheDocument()
  expect(getByText('Promo code')).toBeInTheDocument()
  expect(getByText('Add')).toBeInTheDocument()
  expect(getByText('Delivery')).toBeInTheDocument()
  expect(getByText('Total')).toBeInTheDocument()
  expect(getByText('Pick up')).toBeInTheDocument()

  expect(queryByText('Apply')).not.toBeInTheDocument()
})

it('on clicking Add should display PromocodePopup component, on clicking back button should close the PromocodePopup', () => {
  const totalPrice = {
    currency: '$',
    amount: 300.0,
  }

  const { getByText, queryByText } = render(
    <CheckoutDetails totalPrice={totalPrice} />
  )

  fireEvent.click(getByText('Add'))
  expect(getByText('Back to Cart')).toBeInTheDocument()
  expect(queryByText('Add')).not.toBeInTheDocument()

  fireEvent.click(getByText('Back to Cart'))
  expect(getByText('Add')).toBeInTheDocument()
  expect(queryByText('Back to Cart')).not.toBeInTheDocument()
})
