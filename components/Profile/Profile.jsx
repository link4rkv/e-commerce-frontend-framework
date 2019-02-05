import React, { Component } from 'react'
import styled from 'styled-components'
import Input from '../Input/Input'
import Router from 'next/router'
import { from } from '../../lib/Media'
import Text from '../Text'
import PasswordReset from '../PasswordReset/PasswordReset'
import Popup from '../Popup'
import UpdateNotification from '../UpdateNotification'

const StyledContainer = styled.div`
  margin-top: 1.25rem;

  ${from('tablet')} {
    margin-top: 0.4rem;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    width: 43rem;
  }
`
const InputWrapper = styled.div`
  position: relative;
  max-width: 20.5rem;
  width: 100%;
  margin-bottom: 1rem;

  ${from('tablet')} {
    margin-bottom: 0;

    &:nth-child(2n + 1) {
      margin-right: 2rem;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`

const ChangePassword = styled.button`
  border: none;
  outline: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;

  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
`

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPasswordResetPopup: 'No',
      showPasswordResetSuccessPopup: 'No',
      ...this.props.profile,
    }
    this.handleChange = this.handleChange.bind(this)
    this.clearText = this.clearText.bind(this)
    this.handleShowChangePasswordPopup = this.handleShowChangePasswordPopup.bind(
      this
    )
    this.handleHidePasswordResetPopup = this.handleHidePasswordResetPopup.bind(
      this
    )
  }

  handleHidePasswordResetPopup() {
    this.setState({
      showPasswordResetPopup: 'No',
    })
  }

  handleShowChangePasswordPopup() {
    if (window.innerWidth >= 768) {
      Router.push('/reset-password')
    } else {
      this.setState({
        showPasswordResetPopup: 'Yes',
      })
    }
  }

  handleChange(e) {
    let { name, value } = e.target
    this.setState(prevState => {
      let newState = Object.assign({}, prevState)
      newState[name] = value
      return newState
    })
  }

  clearText(key) {
    this.setState(prevState => {
      let newState = Object.assign({}, prevState)
      newState[key] = ''
      return newState
    })
  }

  render() {
    const {
      showPasswordResetPopup,
      showPasswordResetSuccessPopup,
      first,
      last,
      mobile,
      email,
    } = this.state
    return (
      <StyledContainer>
        <InputWrapper>
          <Input
            variant="black"
            label="First name"
            value={first}
            clear={() => this.clearText('first')}
            name="first"
            required
            onChange={this.handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            variant="black"
            label="Last name"
            value={last}
            clear={() => this.clearText('last')}
            name="last"
            required
            onChange={this.handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            variant="black"
            label="Mobile number"
            value={mobile}
            clear={() => this.clearText('mobile')}
            name="mobile"
            required
            onChange={this.handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            data-testid="email"
            variant="black"
            label="Email"
            value={email}
            clear={() => this.clearText('email')}
            name="email"
            required
            onChange={this.handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            variant="black"
            label="Password"
            value={'&#9679'}
            hideToggleButton
            name="password"
            type="password"
            required
            onChange={this.handleChange}
          />
          <ChangePassword onClick={this.handleShowChangePasswordPopup}>
            <Text size="medium" color="#1557bf" weight="bold">
              Change
            </Text>
          </ChangePassword>
        </InputWrapper>
        {showPasswordResetPopup === 'Yes' && (
          <Popup bgColor="#f3f5f7">
            <PasswordReset
              onCancel={this.handleHidePasswordResetPopup}
              onContinue={() => {
                this.setState({
                  showPasswordResetPopup: 'No',
                  showPasswordResetSuccessPopup: 'Yes',
                })
              }}
            />
          </Popup>
        )}
        {showPasswordResetSuccessPopup === 'Yes' && (
          <UpdateNotification
            onProceed={() => {
              this.setState({ showPasswordResetSuccessPopup: 'No' })
            }}
            notification={{
              title: 'Password reset',
              message: 'You account password has been reset.',
            }}
          />
        )}
      </StyledContainer>
    )
  }
}

export default Profile
