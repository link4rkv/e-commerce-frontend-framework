import React from 'react'
import { AccountConsumer } from '../AccountProvider'
import Button from '../Button/Button'
import Input from '../Input/Input'
import styled from 'styled-components'
import Text from '../Text/Text'
import { from } from '../../lib/Media'

const ForgotPasswordForm = styled.form`
  width: 100%;
  padding: 0.5rem;
  display: 'block';
  ${from('tablet')} {
    width: 50%;
    margin: 0 auto;
  }
`

const Title = styled(Text)`
  margin-bottom: 1rem;
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
    :focus {
      padding: 1.6rem 2rem 0.6rem 1.125rem;
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

const ContinueButton = styled(Button)`
  width: 100%;
  height: 3rem;
  border-radius: 1.5rem;
  background-color: ${props => (props.isEnabled ? '#1557bf' : '#696969')};
  border: none;
  font-size: 0.875rem;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  margin: 0 auto;
  display: block;
  cursor: pointer;
`

const ConfirmationDiv = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0.5rem;
  ${from('tablet')} {
    width: 50%;
  }
`

const ConfirmationTitle = styled(Text)`
  margin-bottom: 1rem;
`

const ConfirmationDescription = styled(Text)`
  margin-bottom: 1.5rem;
`

const ConfirmationButton = styled(Button)`
  width: 100%;
  height: 3rem;
  border-radius: 1.5rem;
  background-color: #1557bf;
  font-size: 1rem;
  cursor: pointer;
`

const ErrorDiv = styled.div`
  color: #ff2843;
  line-height: 1rem;
  padding: 0.625rem 0.625rem 0.625rem 1.25rem;
  text-align: center;
`

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      emailSent: false,
      errors: {},
      errorMessage: false,
      username: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.clearText = this.clearText.bind(this)
  }

  clearText() {
    this.setState({
      username: '',
    })
  }

  canBeSubmitted() {
    const { username } = this.state
    return username && username.length > 0
  }

  handleChange(event) {
    let key = event.target.name
    let value = event.target.value
    this.setState({
      username: value,
    })
    if (value.length > 0 && this.state.errors[key]) {
      this.setState({
        errors: { [key]: '' },
      })
    }
  }

  validate() {
    const { username } = this.state
    let errors = {}
    let isFormValid = true

    if (!username) {
      errors.username = '*Required'
      isFormValid = false
    }

    this.setState({ errors })
    return isFormValid
  }

  handleSubmit(e) {
    e.preventDefault()

    if (!this.validate()) {
      return
    }

    this.props
      .fetch('password', {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.username,
        }),
      })
      .then(() => {
        this.setState(
          {
            emailSent: true,
          },
          () =>
            typeof this.props.onSubmit === 'function' && this.props.onSubmit()
        )
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

    return !this.state.emailSent ? (
      <ForgotPasswordForm onSubmit={this.handleSubmit}>
        <Title as="h3" size="xl" weight="bold" color="#333333">
          Forgot Password
        </Title>
        <StyledInput
          name="username"
          type="text"
          label="Email or mobile"
          id="fp-username"
          onChange={this.handleChange}
          value={this.state.username || ''}
          error={errors && errors.username && errors.username.length > 0}
          errorMessage={errors && errors.username}
          clear={() => this.clearText('username')}
        />
        <ErrorDiv>{this.state.errorMessage}</ErrorDiv>
        <ContinueButton type="submit" isEnabled={isEnabled}>
          Continue
        </ContinueButton>
      </ForgotPasswordForm>
    ) : (
      <ConfirmationDiv>
        <ConfirmationTitle as="h3" size="xxl" weight="bold" color="#333333">
          Check your email
        </ConfirmationTitle>
        <ConfirmationDescription
          as="p"
          size="medium"
          weight="regular"
          color="#333333"
        >
          We’ve sent you an email with instructions to reset your password.{' '}
          <br />
          Please visit Help for futher assitance.
        </ConfirmationDescription>
        <ConfirmationButton>Ok, got it.</ConfirmationButton>
      </ConfirmationDiv>
    )
  }
}

const ForgotPasswordContainer = props => (
  <AccountConsumer>
    {({ fetch }) => <ForgotPassword fetch={fetch} {...props} />}
  </AccountConsumer>
)

export default ForgotPasswordContainer
