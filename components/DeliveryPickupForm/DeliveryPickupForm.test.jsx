import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { setupGoogleMock } from '../../lib/jest/mockGoogleMapsSetup'
import DeliveryPickupForm from './DeliveryPickupForm'

import { pickupLocations } from '../../mocks'

describe('initial render', () => {
  beforeAll(() => setupGoogleMock())

  it('initial render and toggling should work', () => {
    const { getByText, queryByText } = render(<DeliveryPickupForm />)

    expect(
      getByText('How would you like to receive your order?')
    ).toBeInTheDocument()

    fireEvent.click(getByText('How would you like to receive your order?'))

    expect(getByText('Home Delivery')).toBeInTheDocument()
    expect(getByText('Click & Collect')).toBeInTheDocument()

    fireEvent.click(getByText('How would you like to receive your order?'))

    expect(queryByText('Home Delivery')).not.toBeInTheDocument()
    expect(queryByText('Click & Collect')).not.toBeInTheDocument()
  })

  it('stores are shown and can be selected', () => {
    const orgData = {
      pickupLocations,
    }

    const handleUpdateCheckoutAddress = jest.fn()
    const { getByText, getByTestId, getAllByTestId } = render(
      <DeliveryPickupForm
        updateCheckoutAddress={handleUpdateCheckoutAddress}
        organizationData={orgData}
      />
    )

    fireEvent.click(getByText('How would you like to receive your order?'))

    fireEvent.click(getByText('Click & Collect'))

    expect(getAllByTestId('store')).toHaveLength(1)
    expect(getByText(/Store 1/)).toBeInTheDocument()
    expect(getByText(/Store 1 address/)).toBeInTheDocument()

    fireEvent.click(getByTestId('store'))

    expect(handleUpdateCheckoutAddress).toHaveBeenCalledWith({
      name: 'Store 1',
      address: 'Store 1 address',
      storeId: 1,
      type: 'pickup',
    })
  })
})
