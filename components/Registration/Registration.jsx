import React from 'react'
import { AccountConsumer } from '../AccountProvider'
import Button from '../Button/Button'
import Text from '../Text/Text'
import styled from 'styled-components'
import { from } from '../../lib/Media'
import UserRegistrationConfirmation from '../UserRegistrationConfirmation/UserRegistrationConfirmation'
import Popup from '../Popup/Popup'
import Input from '../Input/Input'

const RegistrationForm = styled.form`
  width: 100%;
  padding: ${({ variant }) =>
    variant === 'checkout' ? '1.5rem 0 0' : '0.5rem'};
  display: ${props => (props.showRegistrationForm ? 'block' : 'none')};
  ${from('tablet')} {
    width: ${({ variant }) => (variant === 'checkout' ? '100%' : '48%')};
    padding: ${({ variant }) =>
      variant === 'checkout' ? '1.5rem 0 0' : '2rem 0'};
    display: block;
  }
`

const RegistrationTitle = styled(Text)`
  margin-bottom: ${({ variant }) => (variant === 'checkout' ? '0' : '1rem')};
`

const StyledInlineBlock = styled.div`
  width: 100%;
  display: inline-block;
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

const PasswordValidationSpan = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #696969;
  margin-left: 0.75rem;
`

const TermsPara = styled(Text)`
  margin: ${({ variant }) =>
    variant === 'checkout' ? '1rem 0 0.5rem 0' : '1rem 0 2rem 0'};
`

const HighlightedSpan = styled(Text)`
  cursor: pointer;
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

const ErrorDiv = styled.div`
  color: #ff2843;
  line-height: 1rem;
  padding: 0.625rem 0.625rem 0.625rem 1.25rem;
  text-align: center;
`

class Registration extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
      errors: {},
      errorMessage: '',
      showRegisteredConfimationModal: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validate = this.validate.bind(this)
    this.canBeSubmitted = this.canBeSubmitted.bind(this)
    this.handleToggleRegistrationConfirmationModal = this.handleToggleRegistrationConfirmationModal.bind(
      this
    )
    this.clearText = this.clearText.bind(this)
  }

  clearText(field) {
    this.setState(prevState => {
      let newState = Object.assign({}, prevState)
      newState.data[field] = ''
      return newState
    })
  }

  canBeSubmitted() {
    const { data } = this.state
    return (
      data.name &&
      data.name.length > 0 &&
      (data.phone && data.phone.length > 0) &&
      (data.email && data.email.length > 0) &&
      (data.password && data.password.length > 6)
    )
  }

  handleToggleRegistrationConfirmationModal() {
    this.setState({
      showRegisteredConfimationModal: !this.state
        .showRegisteredConfimationModal,
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

    if (!data.name) {
      errors.name = '*Required'
      isFormValid = false
    }
    if (!data.phone) {
      errors.phone = '*Required'
      isFormValid = false
    }
    if (!data.email) {
      errors.email = '*Required'
      isFormValid = false
    }
    if (data.email && !data.email.includes('@')) {
      errors.email = '*Not a valid email'
      isFormValid = false
    }
    if (!data.password) {
      errors.password = '*Required'
      isFormValid = false
    }
    if (data.password && data.password.length < 6) {
      errors.password = '*Password must be at least 6 characters'
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
      .fetch('register', {
        method: 'POST',
        body: JSON.stringify(this.state.data),
      })
      .then(() => {
        this.handleShowRegistrationConfirmationModal()
      })
      .catch(e => {
        this.setState({
          errorMessage: e.message,
        })
      })
  }

  render() {
    const isEnabled = this.canBeSubmitted()
    const { errors } = this.state
    let { variant } = this.props
    return (
      <RegistrationForm
        onSubmit={this.handleSubmit}
        showRegistrationForm={this.props.showRegistrationForm}
        variant={variant}
      >
        {this.state.showRegisteredConfimationModal && (
          <Popup onClose={this.handleToggleRegistrationConfirmationModal}>
            <UserRegistrationConfirmation />
          </Popup>
        )}
        <RegistrationTitle
          as="h3"
          size={variant === 'checkout' ? 'large' : 'xl'}
          weight="bold"
          color="#333333"
          variant={variant}
        >
          Create an account
        </RegistrationTitle>
        <StyledInlineBlock>
          <StyledInput
            name="name"
            type="text"
            label="Name"
            id="name"
            value={(this.state.data && this.state.data.name) || ''}
            onChange={this.handleChange}
            invalid={errors && errors.name}
            clear={() => this.clearText('name')}
          />
        </StyledInlineBlock>
        <StyledInlineBlock>
          <StyledInput
            name="phone"
            type="number"
            label="Mobile Number"
            id="phone"
            value={(this.state.data && this.state.data.phone) || ''}
            onChange={this.handleChange}
            invalid={errors && errors.phone}
            clear={() => this.clearText('phone')}
          />
        </StyledInlineBlock>
        <StyledInlineBlock>
          <StyledInput
            name="email"
            type="email"
            label="Email address"
            id="email"
            value={(this.state.data && this.state.data.email) || ''}
            onChange={this.handleChange}
            invalid={errors && errors.email}
            clear={() => this.clearText('email')}
          />
        </StyledInlineBlock>
        <StyledInlineBlock>
          <StyledInput
            name="password"
            type="password"
            label="Password"
            id="password"
            value={(this.state.data && this.state.data.password) || ''}
            onChange={this.handleChange}
            invalid={errors && errors.password}
            clear={() => this.clearText('password')}
          />
        </StyledInlineBlock>
        {errors && !(errors.password && errors.password.length > 0) && (
          <PasswordValidationSpan>
            Password must be at least 6 characters
          </PasswordValidationSpan>
        )}
        <TermsPara
          as="p"
          size="medium"
          weight="regular"
          color="#696969"
          variant={variant}
        >
          By creating an account you agree to all FairPrice{' '}
          <HighlightedSpan weight="bold" color="#1557bf">
            Conditions of use
          </HighlightedSpan>{' '}
          and{' '}
          <HighlightedSpan weight="bold" color="#1557bf">
            Privacy Notice
          </HighlightedSpan>
        </TermsPara>
        {this.state.errorMessage && (
          <ErrorDiv>{this.state.errorMessage}</ErrorDiv>
        )}
        {variant !== 'checkout' && (
          <ContinueButton type="submit" isEnabled={isEnabled}>
            Continue
          </ContinueButton>
        )}
      </RegistrationForm>
    )
  }
}

const RegistrationContainer = props => (
  <AccountConsumer>
    {({ fetch }) => <Registration fetch={fetch} {...props} />}
  </AccountConsumer>
)

export default RegistrationContainer
