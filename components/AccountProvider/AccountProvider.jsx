import React, { Component, createContext } from 'react'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'

const {
  publicRuntimeConfig: { API_URL },
} = getConfig()

const { Provider, Consumer } = createContext({
  accountData: {},
  update: () => {},
})

class AccountProvider extends Component {
  constructor(props) {
    super(props)
    const { defaultAccountData } = this.props
    this.state = {
      accountData:
        typeof defaultAccountData === 'function' ? {} : defaultAccountData,
    }

    this.update = this.update.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.fetch = this.fetch.bind(this)
  }

  login(username, password) {
    // Get a token
    return this.fetch('login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }).then(res => {
      if (res.data && res.data.customer) {
        this.setState({ accountData: res.data.customer }, () =>
          this.setToken(res.data.customer.accessToken)
        )
      }
    })
  }

  isLoggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    //return !!token && !isTokenExpired(token) // handwaiving here
    return !!token && new Date().getTime() < expiresAt
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
    // expiresAt does not work yet. To do.
    let expiresAt = JSON.stringify(50000000 + new Date().getTime())
    localStorage.setItem('expires_at', expiresAt)
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from localStorage
    this.setState({ accountData: {} }, () => {
      localStorage.removeItem('id_token')
      localStorage.removeItem('profile')
      localStorage.removeItem('expires_at')
    })
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.code >= 200 && response.code < 300) {
      return response
    } else {
      var error = new Error(
        response.message
          .split(': ')
          .slice(2)
          .join(' ')
      )
      error.response = response
      throw error
    }
  }

  async fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    if (this.isLoggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(`${API_URL}/${url}`, {
      ...options,
      headers,
    })
      .then(response => response.json())
      .then(this._checkStatus)
  }

  update(accountData) {
    this.setState({ accountData })
  }

  componentDidUpdate(prevState) {
    if (prevState.accountData !== this.state.accountData) {
      this.setProfile(this.state.accountData)
    }
  }

  componentDidMount() {
    const { defaultAccountData } = this.props
    if (typeof defaultAccountData === 'function') {
      this.setState({ accountData: defaultAccountData() })
    }
  }

  render() {
    let { children } = this.props
    return (
      <Provider
        value={{
          accountData: this.state.accountData,
          update: this.update,
          login: this.login,
          logout: this.logout,
          isLoggedIn: this.isLoggedIn,
          fetch: this.fetch,
        }}
      >
        {children}
      </Provider>
    )
  }
}

function withAccount(Comp) {
  class Authenticated extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isLoggedIn: false,
      }
    }
    componentDidMount() {
      if (!this.props.isLoggedIn()) {
        Router.push('/login')
      } else {
        this.setState({ isLoggedIn: true })
      }
    }
    render() {
      let { isLoggedIn } = this.state
      return !isLoggedIn ? null : <Comp {...this.props} />
    }
  }
  const Wrapper = () => (
    <AccountConsumer>{props => <Authenticated {...props} />}</AccountConsumer>
  )

  return Wrapper
}

const AccountConsumer = Consumer

export default AccountProvider

export { AccountConsumer, withAccount }
