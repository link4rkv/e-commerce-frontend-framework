import React from 'react'
import { render, cleanup, wait, fireEvent } from 'react-testing-library'
import Registration from './Registration'

afterEach(cleanup)

it('renders the registration form', () => {
  const handleSubmit = jest.fn()
  const { getByLabelText, getByText } = render(
    <Registration onSubmit={handleSubmit} />
  )

  expect(getByLabelText(/Name/)).toBeInTheDocument()
  expect(getByLabelText(/Email/)).toBeInTheDocument()
  expect(getByLabelText(/Mobile Number/)).toBeInTheDocument()
  expect(getByLabelText(/Password/)).toBeInTheDocument()
  expect(getByText(/Continue/)).toBeInTheDocument()
})

it('calls onSubmit with user details', async () => {
  const handleSubmit = jest.fn()
  let mockFetch = jest.fn(
    () =>
      new Promise(resolve => {
        resolve()
      })
  )
  const { getByLabelText, getByText } = render(
    <Registration onSubmit={handleSubmit} fetch={mockFetch} />
  )

  fireEvent.change(getByLabelText(/Name/i), { target: { value: 'vageesha' } })
  fireEvent.change(getByLabelText(/Email/i), {
    target: { value: 'vageesha@zopnow.com' },
  })
  fireEvent.change(getByLabelText(/Mobile Number/i), {
    target: { value: '7676766565' },
  })
  fireEvent.change(getByLabelText(/Password/i), {
    target: { value: '23232334' },
  })
  getByText(/Continue/i).click()

  wait(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'vageesha',
      phone: '7676766565',
      email: 'vageesha@zopnow.com',
      password: '23232334',
    })
  })
})
