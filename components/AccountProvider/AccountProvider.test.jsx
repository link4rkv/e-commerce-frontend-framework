import React from 'react'
import { render, fireEvent, wait } from 'react-testing-library'
import AccountProvider, {
  AccountConsumer,
  withAccount,
} from './AccountProvider'
import { store } from '../CartProvider'
import { UserData } from '../../mocks'

beforeEach(() => {
  localStorage.clear()
})

it('userdata is properly shown', () => {
  localStorage.setItem('profile', JSON.stringify(UserData))

  const { getByText } = render(
    <AccountProvider defaultAccountData={store('profile')}>
      <AccountConsumer>
        {({ accountData }) => <div>Name: {accountData.name}</div>}
      </AccountConsumer>
    </AccountProvider>
  )

  expect(getByText(/Vageesha B R/)).toBeInTheDocument()
})

it('userdata is properly updated', () => {
  localStorage.setItem('profile', JSON.stringify({}))

  const { queryByText } = render(
    <AccountProvider defaultAccountData={store('profile')}>
      <AccountConsumer>
        {({ accountData, update }) => (
          <React.Fragment>
            {accountData && <div>Name: {accountData.name}</div>}
            <div onClick={() => update(UserData)}>Update</div>
          </React.Fragment>
        )}
      </AccountConsumer>
    </AccountProvider>
  )

  expect(queryByText(/Vageesha B R/)).not.toBeInTheDocument()

  fireEvent.click(queryByText('Update'))

  expect(queryByText(/Vageesha B R/)).toBeInTheDocument()
})

it('login method is executing properly', () => {
  fetch.resetMocks()
  let response = {
    code: 200,
    status: 'SUCCESS',
    data: {
      customer: {
        name: 'Vageesha B R',
        accessToken: 'token',
      },
    },
  }

  localStorage.setItem('profile', JSON.stringify({}))
  fetch.mockResponseOnce(JSON.stringify(response))

  const { getByText } = render(
    <AccountProvider defaultAccountData={store('profile')}>
      <AccountConsumer>
        {({ login }) => (
          <React.Fragment>
            <div onClick={() => login('username', 'password')}>Login</div>
          </React.Fragment>
        )}
      </AccountConsumer>
    </AccountProvider>
  )

  fireEvent.click(getByText('Login'))

  wait(() => {
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'profile',
      JSON.stringify({
        name: 'Vageesha B R',
        accessToken: 'token',
      })
    )

    expect(localStorage.setItem).toHaveBeenLastCalledWith('id_token', 'token')
  })
})

it('logout method is executing properly', () => {
  localStorage.setItem('profile', JSON.stringify({ UserData }))

  const { getByText } = render(
    <AccountProvider defaultAccountData={store('profile')}>
      <AccountConsumer>
        {({ logout }) => (
          <React.Fragment>
            <div onClick={() => logout()}>Logout</div>
          </React.Fragment>
        )}
      </AccountConsumer>
    </AccountProvider>
  )

  fireEvent.click(getByText('Logout'))

  wait(() => {
    expect(localStorage.removeItem).toHaveBeenCalledWith('profile')

    expect(localStorage.removeItem).toHaveBeenCalledWith('id_token')
  })
})

it('logged-in status is properly returned', () => {
  localStorage.setItem('profile', JSON.stringify({ UserData }))

  const { getByText } = render(
    <AccountProvider defaultAccountData={store('profile')}>
      <AccountConsumer>
        {({ isLoggedIn, logout }) => {
          let loggedInStatus = isLoggedIn()

          return (
            <React.Fragment>
              <div>Status: {loggedInStatus ? 'LoggedIn' : 'Guest'}</div>
              <div onClick={() => logout()}>Logout</div>
            </React.Fragment>
          )
        }}
      </AccountConsumer>
    </AccountProvider>
  )
  wait(() => {
    expect(getByText('Status: LoggedIn')).toBeInTheDocument()
  })

  fireEvent.click(getByText('Logout'))

  wait(() => {
    expect(getByText('Staus: Guest')).toBeInTheDocument()
  })
})

it('private pages are served after authentication', () => {
  localStorage.setItem('profile', JSON.stringify({ UserData }))

  let Comp = () => <div>This is customer data</div>

  const { getByText } = render(
    <AccountProvider defaultAccountData={store('profile')}>
      {withAccount(<Comp />)}
    </AccountProvider>
  )
  wait(() => {
    expect(getByText('This is customer data')).toBeInTheDocument()
  })
})

it('private pages are not served if authentication fails', () => {
  localStorage.setItem('profile', JSON.stringify({}))

  let Comp = () => <div>This is customer data</div>

  const { queryByText } = render(
    <AccountProvider defaultAccountData={store('profile')}>
      {withAccount(<Comp />)}
    </AccountProvider>
  )
  wait(() => {
    expect(queryByText('This is customer data')).not.toBeInTheDocument()
  })
})
