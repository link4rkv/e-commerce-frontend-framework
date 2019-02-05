import React from 'react'
import { render } from 'react-testing-library'
import EmptyCart from './EmptyCart'
import MockNextContext from '../../lib/jest/mockNextContext'

it('should render Empty cart component', () => {
  const { getByText } = render(
    <MockNextContext>
      <EmptyCart />
    </MockNextContext>
  )
  expect(getByText('BOO… Your shopping cart is empty')).toBeInTheDocument()
  expect(
    getByText(
      `Start adding items into your shopping cart and it will appear here.`
    )
  ).toBeInTheDocument()
  expect(getByText('Start shopping')).toBeInTheDocument()
})
