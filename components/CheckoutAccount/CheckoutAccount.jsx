import React, { Component } from 'react'
import styled from 'styled-components'
import Input from '../Input'
import Text from '../Text'
import isEqual from 'lodash/isEqual'

const Container = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  margin-bottom: 0.5rem;
  opacity: ${({ expanded }) => (expanded ? '1' : '0.5')};
`
const Heading = styled.h3`
  font-weight: bold;
  color: #1557bf;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: #333333;
  }
`
const Content = styled.div`
  margin-top: 0.7rem;
`

const StyledForm = styled.form`
  margin-top: 1.5rem;
`

const StyledInlineBlock = styled.div`
  display: inline-block;
  width: 100%;
`

const StyledButton = styled.button`
  margin-right: 1rem;
  padding: 0.63rem 0.75rem;
  text-align: center;
  border-radius: 0.3rem;
  border: 1px solid #eaeaea;
  outline: none;
  cursor: pointer;

  color: ${({ selected }) => (selected ? '#ffffff' : '#1557bf')};
  background-color: ${({ selected }) => (selected ? '#1557bf' : '#ffffff')};
`

class CheckoutAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: {},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let { name, value } = e.target
    this.props.onChange(['account', 'values', name], value)
  }

  handleSubmit(e) {
    e && e.preventDefault()
    let { type, username, password } = this.props.data.values
    let error = Object.assign({}, this.state.error)
    if (type === 'login') {
      if (!username) {
        error.username = '*Required'
      }
      if (!password) {
        error.password = '*Required'
      }
    }

    this.setState({ error })
  }

  handleValidation(data) {
    let { type, username, password } = data,
      isValid = false,
      error = Object.assign(this.state.error, {})

    if (type === 'login') {
      if (username && username.startsWith(' ')) {
        error.username = 'Invalid'
      } else if (username && error.username) {
        delete error.username
      }

      if (password && error.password) {
        delete error.password
      } else if (!password) {
        error.password = '*Required'
      }

      if (username && password) {
        isValid = true
      }
    }

    if (!isEqual(error, this.state.error)) {
      this.setState({ error })
    }

    if (this.props.isLoggedIn()) {
      isValid = true
    }

    isValid = isValid && !Object.keys(error).length

    return isValid
  }

  componentDidMount() {
    let isLoggedIn = this.props.isLoggedIn()
    if (isLoggedIn) {
      this.setState({ isLoggedIn }, () => {
        this.props.onChange(['account', 'valid'], true)
        this.props.onClick('deliveryPickup')
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.values !== this.props.data.values) {
      let isValid = this.handleValidation(this.props.data.values)
      if (isValid) {
        !this.props.data.valid &&
          this.props.onChange(['account', 'valid'], true)
      } else {
        this.props.data.valid &&
          this.props.onChange(['account', 'valid'], false)
      }
    }

    let isLoggedIn = this.props.isLoggedIn()
    if (
      (isLoggedIn && !this.state.isLoggedIn) ||
      (!isLoggedIn && this.state.isLoggedIn)
    ) {
      this.setState({ isLoggedIn }, () => {
        this.props.onChange(['account', 'valid'], true)
        this.props.onClick('deliveryPickup')
      })
    }
  }

  render() {
    let { data, onChange, activeChild, onClick } = this.props
    let { type } = data.values
    let { isLoggedIn } = this.state
    let { error } = data
    return isLoggedIn ? null : (
      <Container
        expanded={activeChild === 'account'}
        onClick={() => data.valid && onClick('account')}
      >
        <Heading>
          <span>Account</span>
        </Heading>
        <Content>
          <StyledButton
            onClick={() => onChange(['account', 'values', 'type'], 'register')}
            selected={type === 'register'}
          >
            <Text weight={type === 'register' ? 'bold' : 'normal'}>
              New user
            </Text>
          </StyledButton>
          <StyledButton
            onClick={() => onChange(['account', 'values', 'type'], 'login')}
            selected={type === 'login'}
          >
            <Text weight={type === 'login' ? 'bold' : 'normal'}>
              Existing user
            </Text>
          </StyledButton>
          <StyledForm noValidate onSubmit={this.handleSubmit}>
            {type === 'register' ? (
              <React.Fragment>
                <Text size="large" weight="bold" color="#333333">
                  Create an account
                </Text>
                <StyledInlineBlock>
                  <Input
                    label="Name"
                    name="name"
                    type="text"
                    onChange={this.handleChange}
                    value={data.values.name}
                    variant="black"
                    required
                  />
                </StyledInlineBlock>
                <StyledInlineBlock>
                  <Input
                    label="Mobile number"
                    name="phone"
                    type="tel"
                    onChange={this.handleChange}
                    value={data.values.phone}
                    variant="black"
                    required
                  />
                </StyledInlineBlock>
                <StyledInlineBlock>
                  <Input
                    label="Email address"
                    name="email"
                    type="text"
                    onChange={this.handleChange}
                    value={data.values.email}
                    variant="black"
                    required
                  />
                </StyledInlineBlock>
                <StyledInlineBlock>
                  <Input
                    label="Passsword"
                    name="na_password"
                    type="password"
                    onChange={this.handleChange}
                    value={data.values.na_password}
                    variant="balck"
                    required
                  />
                </StyledInlineBlock>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Text size="large" weight="bold" color="#333333">
                  Login
                </Text>
                <StyledInlineBlock>
                  <Input
                    label="Email or mobile"
                    name="username"
                    type="text"
                    onChange={this.handleChange}
                    value={data.values.username}
                    variant="black"
                    required
                  />
                </StyledInlineBlock>
                <StyledInlineBlock>
                  <Input
                    label="Passsword"
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    value={data.values.password}
                    variant="balck"
                    required
                  />
                </StyledInlineBlock>
              </React.Fragment>
            )}
          </StyledForm>
        </Content>
        {error && <Text color="#dd0d42">{error}</Text>}
      </Container>
    )
  }
}

export default CheckoutAccount
