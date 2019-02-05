import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import DroppedProductsPopup from './DroppedProductsPopup'
import CartProvider, { store } from '../CartProvider'

beforeEach(() => {
  localStorage.clear()
})

it('should render a DroppedProductPop product', () => {
  const items = {
    957: {
      id: 957,
      name: 'Tesco Pasta & Sauce - Macaroni Cheese',
      description: null,
      slug: 'tesco-pasta-sauce-macaroni-cheese',
      storeSpecificData: [{ mrp: '123' }],
    },
  }

  localStorage.setItem('cart', JSON.stringify(items))

  const { getByText } = render(
    <CartProvider defaultItems={store('cart')}>
      <DroppedProductsPopup showPopup onClose={() => {}} onUpdate={() => {}} />
    </CartProvider>
  )

  expect(getByText('Cancel')).toBeInTheDocument()
  expect(getByText(/different/)).toBeInTheDocument()
  expect(getByText(/Oops!/)).toBeInTheDocument()
})

it('should call close function on clicking cancel button and should call update on proceed', () => {
  const items = {
    957: {
      id: 957,
      name: 'Tesco Pasta & Sauce - Macaroni Cheese',
      description: null,
      slug: 'tesco-pasta-sauce-macaroni-cheese',
      storeSpecificData: [{ mrp: '123' }],
    },
  }

  localStorage.setItem('cart', JSON.stringify(items))
  const handleClose = jest.fn()
  const handleUpdate = jest.fn()
  const { getByText } = render(
    <CartProvider defaultItems={store('cart')}>
      <DroppedProductsPopup
        showPopup
        onClose={handleClose}
        onUpdate={handleUpdate}
      />
    </CartProvider>
  )

  fireEvent.click(getByText('Cancel'))
  expect(handleClose).toHaveBeenCalledTimes(1)
  fireEvent.click(getByText(/Proceed and drop off items/))
  expect(handleUpdate).toHaveBeenCalledTimes(1)
})
