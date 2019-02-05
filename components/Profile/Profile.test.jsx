import React from 'react'
import { render, fireEvent, wait } from 'react-testing-library'
import Profile from './Profile'

global.window.innerWidth = 456

it('should render a profile component', () => {
  const { getByText } = render(<Profile />)

  expect(getByText('First name')).toBeInTheDocument()
  expect(getByText('Last name')).toBeInTheDocument()
  expect(getByText('Mobile number')).toBeInTheDocument()
  expect(getByText('Email')).toBeInTheDocument()
  expect(getByText('Password')).toBeInTheDocument()
  expect(getByText('Change')).toBeInTheDocument()
})

it('on clicking change should open reset password popup and on change shoul show success notification popup', () => {
  const { getByText, queryByTestId, getByTestId } = render(<Profile />)
  fireEvent.click(getByText('Change'))
  expect(getByTestId('resetPassword')).toBeInTheDocument()
  fireEvent.click(getByText('Continue'))
  expect(queryByTestId('resetPassword')).not.toBeInTheDocument()
  expect(getByTestId('updateNotification')).toBeInTheDocument()
  fireEvent.click(getByText('Okay, got it'))
  expect(queryByTestId('updateNotification')).not.toBeInTheDocument()
})

it('on clicking back icon should close reset password popup', () => {
  const { getByText, queryByTestId, getByTestId } = render(<Profile />)
  fireEvent.click(getByText('Change'))
  expect(getByTestId('resetPassword')).toBeInTheDocument()
  fireEvent.click(getByTestId('backButton'))
  expect(queryByTestId('resetPassword')).not.toBeInTheDocument()
})

it('on input change should update dom', () => {
  const { getByText, getAllByTestId } = render(<Profile />)

  fireEvent.change(getAllByTestId('input')[0], {
    target: { value: 'suraj' },
  })
  wait(() => expect(getByText('suraj')).toBeInTheDocument())
})

it('on clicking clear should clear the text', () => {
  const { queryByText, getAllByTestId } = render(<Profile />)

  fireEvent.change(getAllByTestId('input')[0], {
    target: { value: 'chanchal' },
  })

  fireEvent.click(getAllByTestId('remove-icon')[0])

  wait(() => expect(queryByText('chanchal')).not.toBeInTheDocument())
})
