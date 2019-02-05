import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import ConfirmationNotification from './ConfirmationNotification'

it('should render a ConfirmationNotification, and return null if there is no notification', () => {
  const notification = {}

  const { queryByTestId } = render(
    <ConfirmationNotification notification={notification} />
  )

  expect(queryByTestId('confirmationNotification')).not.toBeInTheDocument()
})

it('should render a ConfirmationNotification', () => {
  const notification = {
    title: 'Delete card',
    message: 'Would you like to delete this credit card?',
  }

  const { getByText, queryByTestId } = render(
    <ConfirmationNotification notification={notification} />
  )

  expect(queryByTestId('confirmationNotification')).toBeInTheDocument()
  expect(getByText(/Would you like/)).toBeInTheDocument()
})

it('on click should call onProceed function', () => {
  const handleProceed = jest.fn()
  const notification = {
    title: 'Delete card',
    message: 'Would you like to delete this credit card?',
  }

  const { getByText } = render(
    <ConfirmationNotification
      notification={notification}
      onProceed={handleProceed}
    />
  )

  fireEvent.click(getByText('Yes'))
  expect(handleProceed).toHaveBeenCalledTimes(1)
})
