import React from 'react'
import styled from 'styled-components'
import Text from '../Text/Text'
import Back from '../icons/BlueBackIcon'
import Input from '../Input/Input'

const Container = styled.div`
  display: block;
`

const Header = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  margin-bottom: 1rem;

  display: flex;
  align-items: center;
`

const StyledBack = styled(Back)`
  cursor: pointer;
`

const Title = styled(Text)`
  margin-left: 1rem;
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

class PasswordReset extends React.Component {
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

    const { oldPassword, newPassword } = this.state

    if (typeof this.props.onContinue === 'function') {
      this.props.onContinue(oldPassword, newPassword)
    }
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
    const { onCancel } = this.props
    return (
      <Container data-testid="resetPassword">
        <Header>
          <StyledBack
            height="24"
            width="24"
            fill="#ffffff"
            onClick={onCancel}
            data-testid="backButton"
          />
          <Title size="xl" weight="bold" color="#333333">
            Change password
          </Title>
        </Header>
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
    )
  }
}

export default PasswordReset
