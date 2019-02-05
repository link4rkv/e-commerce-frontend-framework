import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import CheckoutAddressProvider, { CheckoutAddressConsumer } from './'
import { store } from '../CartProvider'

beforeEach(() => {
  localStorage.clear()
})

it('should show the saved address', () => {
  const address = {
    address: 'Demo address',
  }

  localStorage.setItem('checkoutAddress', JSON.stringify(address))

  const { getByTestId } = render(
    <CheckoutAddressProvider defaultAddress={store('checkoutAddress')}>
      <CheckoutAddressConsumer>
        {({ checkoutAddress }) => (
          <div data-testid="checkout-address">{checkoutAddress.address}</div>
        )}
      </CheckoutAddressConsumer>
    </CheckoutAddressProvider>
  )

  expect(getByTestId('checkout-address')).toHaveTextContent('Demo address')
})

it('should update the checkout address', () => {
  const address = {
    address: 'Demo address',
  }
  const { getByTestId } = render(
    <CheckoutAddressProvider defaultAddress={store('checkoutAddress')}>
      <CheckoutAddressConsumer>
        {({ checkoutAddress, update }) => (
          <React.Fragment>
            <div data-testid="checkout-address">{checkoutAddress.address}</div>
            <div data-testid="update-address" onClick={() => update(address)} />
          </React.Fragment>
        )}
      </CheckoutAddressConsumer>
    </CheckoutAddressProvider>
  )

  expect(getByTestId('checkout-address')).toHaveTextContent('')

  fireEvent.click(getByTestId('update-address'))
  expect(localStorage.setItem).toHaveBeenCalledWith(
    'checkoutAddress',
    JSON.stringify(address)
  )
  expect(getByTestId('checkout-address')).toHaveTextContent('Demo address')
})
