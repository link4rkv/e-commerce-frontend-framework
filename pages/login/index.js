import React from 'react'
import styled from 'styled-components'

import Login from '../../components/Login/Login'
import Registration from '../../components/Registration/Registration'

import Layout from '../../components/Layout/Layout'

import { from } from '../../lib/Media'
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword'

const StyledLayout = styled(Layout)`
  > main {
    margin-top: 4.735rem;
    background-color: #fff;
    border: 1px solid #eaeaea;
    display: flex;
    justify-content: center;
    min-height: calc(100vh - 13rem);
    ${from('desktop')} {
      margin-top: 0;
      min-height: calc(100vh - 10.5rem);
    }
  }
  > main > div {
    width: 100%;
  }
`

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  ${from('desktop')} {
    max-width: 59rem;
    justify-content: space-between;
  }
`

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showRegistrationForm: false,
      showLoginForm: true,
      showForgotPasswordForm: false,
    }

    this.handleShowRegistrationLayout = this.handleShowRegistrationLayout.bind(
      this
    )
    this.handleShowForgotPasswordForm = this.handleShowForgotPasswordForm.bind(
      this
    )
  }

  handleShowRegistrationLayout(e) {
    e.preventDefault()

    this.setState({
      showRegistrationForm: true,
      showLoginForm: false,
    })
  }

  handleShowForgotPasswordForm() {
    this.setState({
      showRegistrationForm: false,
      showLoginForm: false,
      showForgotPasswordForm: true,
    })
  }

  render() {
    return (
      <React.Fragment>
        <StyledLayout>
          <MainContainer>
            {!this.state.showForgotPasswordForm ? (
              <React.Fragment>
                {this.state.showLoginForm && (
                  <Login
                    onShowRegistrationLayout={this.handleShowRegistrationLayout}
                    onShowForgotPasswordForm={this.handleShowForgotPasswordForm}
                  />
                )}
                <Registration
                  showRegistrationForm={this.state.showRegistrationForm}
                />
              </React.Fragment>
            ) : (
              <ForgotPassword />
            )}
          </MainContainer>
        </StyledLayout>
      </React.Fragment>
    )
  }
}

LoginPage.defaultProps = {}

export default LoginPage
