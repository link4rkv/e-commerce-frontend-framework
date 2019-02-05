import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import UpdateNotification from './UpdateNotification'

it('should render a UpdateNotification, and return null if there is no notification', () => {
  const notification = {}

  const { queryByTestId } = render(
    <UpdateNotification notification={notification} />
  )

  expect(queryByTestId('updateNotification')).not.toBeInTheDocument()
})

it('should render a UpdateNotification', () => {
  const notification = {
    title: 'Password reset',
    message: 'You account password has been reset.',
  }

  const { getByText, queryByTestId } = render(
    <UpdateNotification notification={notification} />
  )

  expect(queryByTestId('updateNotification')).toBeInTheDocument()
  expect(getByText(/account password/)).toBeInTheDocument()
})

it('on click should call onProceed function', () => {
  const handleProceed = jest.fn()
  const notification = {
    title: 'Password reset',
    message: 'You account password has been reset.',
  }

  const { getByText } = render(
    <UpdateNotification notification={notification} onProceed={handleProceed} />
  )

  fireEvent.click(getByText('Okay, got it'))
  expect(handleProceed).toHaveBeenCalledTimes(1)
})
