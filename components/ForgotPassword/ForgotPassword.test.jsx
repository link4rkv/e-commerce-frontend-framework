import React from 'react'
import { render, cleanup, fireEvent, wait } from 'react-testing-library'
import ForgotPassword from './ForgotPassword'

afterEach(cleanup)

it('renders the forgot password form', () => {
  const handleSubmit = jest.fn()
  const { getByLabelText, getByText } = render(
    <ForgotPassword onSubmit={handleSubmit} />
  )

  expect(getByLabelText(/Email or mobile/)).toBeInTheDocument()
  expect(getByText(/Continue/)).toBeInTheDocument()
})

it('calls onSubmit with username', async () => {
  const handleSubmit = jest.fn()
  fetch.resetMocks()
  const response = {
    code: 200,
    status: 'SUCCESS',
  }
  let mockFetch = jest.fn(
    () =>
      new Promise(resolve => {
        resolve()
      })
  )
  const { getByText, getByTestId } = render(
    <ForgotPassword onSubmit={handleSubmit} fetch={mockFetch} />
  )

  fetch.mockResponseOnce(JSON.stringify(response))

  fireEvent.change(getByTestId('input'), {
    target: { value: 'vageesha@zopnow.com' },
  })

  fireEvent.click(getByText(/Continue/))

  wait(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith({
      username: 'vageesha@zopnow.com',
    })
  })
})
