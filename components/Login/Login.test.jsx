import React from 'react'
import {
  render,
  cleanup,
  fireEvent,
  RenderResult,
  wait,
} from 'react-testing-library'
import Login from './Login'

afterEach(cleanup)

describe('LoginFormComponent', () => {
  let fakeUser = { username: 'vageesha@zopnow.com', password: '45755200' }
  let wrapper = RenderResult
  let handleSubmit = jest.fn()
  let login = jest.fn(
    () =>
      new Promise(resolve => {
        resolve()
      })
  )

  it('renders the login form', () => {
    const { getByLabelText, getByText } = render(
      <Login onSubmit={handleSubmit} />
    )

    expect(getByLabelText(/Email or mobile/)).toBeInTheDocument()
    expect(getByLabelText(/Password/)).toBeInTheDocument()
    expect(getByText(/Log in/)).toBeInTheDocument()
  })

  it('Submits Login with email and password', () => {
    wrapper = render(<Login onSubmit={handleSubmit} login={login} />)

    const emailNode = wrapper.getByLabelText(/Email or mobile/i)
    const passwordNode = wrapper.getByLabelText(/Password/i)
    const formNode = wrapper.getByTestId('login-form')

    fireEvent.change(emailNode, { target: { value: fakeUser.username } })
    fireEvent.change(passwordNode, { target: { value: fakeUser.password } })

    fireEvent.submit(formNode)

    wait(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1)
      expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
    })
  })
})
