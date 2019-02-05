import React from 'react'
import { AccountConsumer } from '../AccountProvider'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Text from '../Text/Text'
import styled from 'styled-components'
import { from } from '../../lib/Media'
import Router from 'next/router'

const LoginForm = styled.form`
  width: 100%;
  padding: ${({ variant }) =>
    variant === 'checkout' ? '1.5rem 0 0' : '1rem 0.5rem'};
  display: 'block';
  ${from('tablet')} {
    width: ${({ variant }) => (variant === 'checkout' ? '100%' : '48%')};
    padding: ${({ variant }) =>
      variant === 'checkout' ? '1.5rem 0 0' : '2rem 0'};
  }
`

const LoginTitle = styled(Text)`
  margin-bottom: ${({ variant }) => (variant === 'checkout' ? '0' : '1rem')};
`

const StyledInput = styled(Input)`
  > input {
    border: 1px solid #eaeaea;
    width: 100%;
    height: 3.5rem;
    font-size: 1rem;
    border-radius: 4px;
    line-height: 1.43;
    padding: 1.6rem 2rem 0.6rem 1.125rem;
    :focus + label,
    :not([value='']) + label {
      top: 0.65rem !important;
    }
    :valid {
      padding: 1.6rem 2rem 0.6rem 1.125rem;
    }
  }
  > label {
    left: 1.125rem;
    top: 1.2rem;
  }
`

const ForgotPasswordButton = styled.span`
  font-size: 0.875rem;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #1557bf;
  background: transparent;
  border: none;
  padding: 0px;
  display: block;
  margin: ${({ variant }) =>
    variant === 'checkout' ? '0 0 0.3rem 1.25rem' : '0 0 1rem 1.25rem'};
  cursor: pointer;
`

const LoginButton = styled(Button)`
  width: 100%;
  height: 3rem;
  border-radius: 1.5rem;
  background-color: ${props => (props.isEnabled ? '#1557bf' : '#696969')};
  border: none;
  font-size: 1rem;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  margin: 0 auto;
  display: ${({ hide }) => (hide ? 'none' : 'block')};
  cursor: pointer;
  margin-bottom: 1rem;
`

const CreateNewAccountButton = styled(Button)`
  width: 100%;
  height: 1.25rem;
  border: none;
  background-color: #fff;
  font-size: 1rem;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: #1557bf;
  margin: 0 auto;
  display: block;
  cursor: pointer;
  ${from('tablet')} {
    display: none;
  }
`

const StyledInlineBlock = styled.div`
  display: inline-block;
  width: 100%;
`

const ErrorDiv = styled.div`
  color: #ff2843;
  line-height: 1rem;
  padding: 0.625rem 0.625rem 0.625rem 1.25rem;
  text-align: center;
`

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      data: {},
      errors: {},
      errorMessage: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.canBeSubmitted = this.canBeSubmitted.bind(this)
    this.clearText = this.clearText.bind(this)
  }

  canBeSubmitted() {
    const { data } = this.state
    return (
      data.username &&
      data.username.length > 0 &&
      (data.password && data.password.length > 6)
    )
  }

  clearText(field) {
    this.setState(prevState => {
      let newState = Object.assign({}, prevState)
      newState.data[field] = ''
      return newState
    })
  }

  handleChange(event) {
    let key = event.target.name
    let value = event.target.value
    this.setState(prevState => {
      let newState = Object.assign({}, prevState)
      newState.data[key] = value
      return newState
    })
    if (value.length > 0 && this.state.errors[key]) {
      this.setState({
        errors: { [key]: '' },
      })
    }
  }

  validate() {
    const { data } = this.state
    let errors = {}
    let isFormValid = true

    if (!data.username) {
      errors.username = '*Required'
      isFormValid = false
    }
    if (!data.password) {
      errors.password = '*Required'
      isFormValid = false
    }
    if (data.password && data.password.length < 6) {
      errors.password = '*Password must be at least 6 characters.'
      isFormValid = false
    }

    this.setState({ errors })
    return isFormValid
  }

  handleSubmit(e) {
    e.preventDefault()

    if (!this.validate()) {
      if (this.state.errorMessage.trim().length > 0) {
        this.setState({
          errorMessage: '',
        })
      }
      return
    }
    this.props
      .login(this.state.data.username, this.state.data.password)
      .then(() => {
        if (this.props.variant !== 'checkout') {
          Router.push('/')
        }
      })
      .catch(e => {
        this.setState({
          errorMessage: e.message,
        })
      })
  }

  render() {
    const { errors } = this.state
    const isEnabled = this.canBeSubmitted()
    let { variant } = this.props

    return (
      <LoginForm
        onSubmit={this.handleSubmit}
        showLoginForm={this.props.showLoginForm}
        variant={variant}
        data-testid="login-form"
      >
        <LoginTitle
          as="h3"
          size={variant === 'checkout' ? 'large' : 'xl'}
          weight="bold"
          color="#333333"
          variant={variant}
        >
          Log in
        </LoginTitle>
        <StyledInlineBlock>
          <StyledInput
            name="username"
            type="text"
            label="Email or mobile"
            id="login-username"
            value={(this.state.data && this.state.data.username) || ''}
            onChange={this.handleChange}
            invalid={errors && errors.username}
            clear={() => this.clearText('username')}
          />
        </StyledInlineBlock>
        <StyledInlineBlock>
          <StyledInput
            name="password"
            type="password"
            label="Password"
            id="login-password"
            value={(this.state.data && this.state.data.password) || ''}
            onChange={this.handleChange}
            invalid={errors && errors.password}
            clear={() => this.clearText('password')}
            hideToggleButton
          />
        </StyledInlineBlock>
        <ForgotPasswordButton
          onClick={this.props.onShowForgotPasswordForm}
          variant={variant}
        >
          Forgot Password
        </ForgotPasswordButton>
        {this.state.errorMessage && (
          <ErrorDiv>{this.state.errorMessage}</ErrorDiv>
        )}
        <LoginButton
          type="submit"
          isEnabled={isEnabled}
          hide={variant === 'checkout'}
        >
          Log in
        </LoginButton>
        {variant !== 'checkout' && (
          <CreateNewAccountButton onClick={this.props.onShowRegistrationLayout}>
            Create an account
          </CreateNewAccountButton>
        )}
      </LoginForm>
    )
  }
}

const LoginContainer = props => (
  <AccountConsumer>
    {({ login }) => <Login login={login} {...props} />}
  </AccountConsumer>
)

export default LoginContainer
