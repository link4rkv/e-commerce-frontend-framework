import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import StoreSelector from './'
import { pickupLocations } from '../../mocks'

it('should render store selector', () => {
  const { getByText, getAllByTestId } = render(
    <StoreSelector pickupLocations={pickupLocations} />
  )

  expect(getAllByTestId('store')).toHaveLength(1)
  expect(getByText(/Store 1/)).toBeInTheDocument()
  expect(getByText(/Store 1 address/)).toBeInTheDocument()
})

it('onclick function should trigger', () => {
  const handleSelectStore = jest.fn()
  const { getByTestId } = render(
    <StoreSelector
      pickupLocations={pickupLocations}
      onSelect={handleSelectStore}
    />
  )

  fireEvent.click(getByTestId('store'))
  expect(handleSelectStore).toHaveBeenCalledTimes(1)
})
