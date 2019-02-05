import React from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import Text from '../../components/Text/Text'
import Input from '../../components/Input'
import Layout from '../../components/Layout'

const Container = styled.div`
  width: 20.5rem;
  margin: auto;
`

const Title = styled(Text)`
  margin-bottom: 1rem;
`

const StyledForm = styled.form`
  text-align: center;
`

const FormGroup = styled.div`
  width: 20.5rem;
  height: 56px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
`

const ContinueButton = styled.button`
  max-width: 198.5px;
  width: 100%;
  height: 36px;
  border-radius: 18px;
  background-color: #1557bf;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  margin-top: 0.5rem;
  outline: none;
`

class ResetPassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      oldPassword: '',
      newPassword: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    //const { oldPassword, newPassword } = this.state
    Router.push('/accounts')
    // MAke network call to reset password
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { oldPassword, newPassword } = this.state

    return (
      <Layout hideCheckoutAddress>
        <Container>
          <Title size="xl" weight="bold" color="#333333">
            Change password
          </Title>
          <StyledForm action="#" onSubmit={this.handleSubmit}>
            <FormGroup>
              <Input
                variant="black"
                type="password"
                name="oldPassword"
                value={oldPassword}
                label="Old password"
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                variant="black"
                type="password"
                name="newPassword"
                value={newPassword}
                label="New password"
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <ContinueButton onClick={this.handleSubmit}>
              <Text size="medium" weight="bold" color="#ffffff">
                Continue
              </Text>
            </ContinueButton>
          </StyledForm>
        </Container>
      </Layout>
    )
  }
}

export default ResetPassword
