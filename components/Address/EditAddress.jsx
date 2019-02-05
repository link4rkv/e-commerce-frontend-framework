import React, { Component } from 'react'
import styled from 'styled-components'
import Text from '../Text'
import Input from '../Input'
import Button from '../Button'

const StyledContainer = styled.form`
  width: 20.5rem;
  margin-top: 1.75rem;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #ffffff;
  min-height: 36.0625rem;
`
const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`
const DefaultText = styled(Text)`
  margin-right: 0.5rem;
`
const StyledInput = styled.input`
  display: none;

  &:checked + label::after {
    background-color: #0d3578;
  }
`
const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  &::after {
    content: '';
    display: inline-block;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    border: 1px solid #1557bf;
    margin-right: 0.5rem;
  }
`
const InputWrapper = styled.div`
  margin-bottom: 1rem;
  margin-right: 0.5rem;
`
const Addresses = styled.div`
  display: flex;
`
const DoneButton = styled(Button)`
  height: 2.25rem;
  border-radius: 1.125rem;
  width: 12.5rem;
  display: block;
  margin: 1.5rem auto 0.5rem;
  cursor: pointer;
  outline: none;
`

const MainContainer = styled.div`
  text-align: center;
  width: fit-content;
`

const AddCardButtonWrp = styled.div`
  width: 20.5rem;
  padding: 3rem 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AddCardButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #1557bf;
  border-radius: 16rem;
  border: none;
  cursor: pointer;
  outline: none;
  color: #ffffff;
`

const StyledText = styled(Text)`
  text-align: left;
  display: block;
`

const CloseBtn = styled(Text)`
  line-height: 1rem;
`

class EditAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data || {},
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let { name, value } = e.target
    this.setState(prevState => {
      let newState = Object.assign({}, prevState)
      newState.data[name] = value
      return newState
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props
      .fetch(`address`, {
        method: 'POST',
        body: JSON.stringify(this.state.data),
      })
      .then(() => {})
      .catch(error => error)
  }

  render() {
    const { data } = this.state
    const { pincode, building, street, block, floor, unit, name, phone } = data
    let { onClick } = this.props
    return (
      <MainContainer>
        <AddCardButtonWrp>
          {
            <AddCardButton onClick={() => onClick('')}>
              <CloseBtn size="xxl">⨉</CloseBtn>
            </AddCardButton>
          }
        </AddCardButtonWrp>
        <StyledContainer onSubmit={this.handleSubmit}>
          <CardTitle>
            {
              <Text color="#333333" weight="bold" size="large">
                {data ? 'Edit Address' : 'Add Address'}
              </Text>
            }
            <div>
              <StyledInput type="radio" name="radioButton" id="delivery" />
              <StyledLabel htmlFor="delivery">
                <DefaultText size="medium" weight="regular" color="#333333">
                  Default
                </DefaultText>
              </StyledLabel>
            </div>
          </CardTitle>
          <InputWrapper>
            <Input
              label="Postal code"
              value={pincode}
              name="pincode"
              required
              onChange={this.handleChange}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Building name(Optional)"
              value={building}
              name="building"
              required
              onChange={this.handleChange}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Street"
              value={street}
              name="street"
              required
              onChange={this.handleChange}
            />
          </InputWrapper>
          <Addresses>
            <InputWrapper>
              <Input
                label="Block"
                value={block}
                name="block"
                required
                onChange={this.handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                label="Floor"
                value={floor}
                name="floor"
                required
                onChange={this.handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                label="Unit"
                value={unit}
                name="unit"
                required
                onChange={this.handleChange}
              />
            </InputWrapper>
          </Addresses>
          <StyledText color="#333333" weight="bold" size="large">
            Contact details
          </StyledText>
          <InputWrapper>
            <Input
              label="Name"
              value={name}
              name="name"
              required
              onChange={this.handleChange}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Mobile number"
              value={phone}
              name="phone"
              required
              onChange={this.handleChange}
            />
          </InputWrapper>
          <DoneButton type="submit">
            <Text>Done</Text>
          </DoneButton>
        </StyledContainer>
      </MainContainer>
    )
  }
}

export default EditAddress
