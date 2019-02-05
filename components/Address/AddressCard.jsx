import React, { Component } from 'react'
import styled from 'styled-components'
import Text from '../Text'
import EditAddress from './EditAddress'
import { from } from '../../lib/Media'

const StyledContainer = styled.div`
  margin: 1.75rem auto 0 auto;

  ${from('tablet')} {
    width: 43rem;
    display: flex;
    flex-wrap: wrap;
  }
`

const StyledCardContainer = styled.div`
  max-width: 20.5rem;
  width: 100%;
  margin-bottom: 1rem;
  min-height: 8.4375rem;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #ffffff;
  cursor: pointer;

  ${from('tablet')} {
    margin-right: 2rem;

    &:nth-child(2n + 2) {
      margin-right: 0;
    }
  }
`
const AddCardButtonWrp = styled.div`
  max-width: 20.5rem;
  width: 100%;
  height: 8.4375rem;
  padding: 1.875rem;
  border: 1px solid #eaeaea;
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
const Address = styled.div`
  max-width: 14.5rem;
`

class AddressCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAddressId: this.props.address.defaultAddress.id,
      type: '',
    }
    this.handleAddressAction = this.handleAddressAction.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleAddressAction(type, editData) {
    this.setState(prevState => {
      let newState = Object.assign({}, prevState)
      newState.type = type
      if (editData) {
        newState.dataForEdit = editData
      }

      if (type === '') {
        delete newState.dataForEdit
      }

      return newState
    })
  }

  handleChange(e) {
    this.setState({ selectedAddressId: e.target.value })
  }

  render() {
    let { name, phones, addresses, accessToken } = this.props.address
    let { fetch } = this.props
    let phone = phones[0].phone
    let { type, dataForEdit } = this.state
    return (
      <StyledContainer>
        {addresses.map(el => (
          <StyledCardContainer
            key={el.id}
            onClick={() => !dataForEdit && this.handleAddressAction('edit', el)}
          >
            <CardTitle>
              <div>
                <Text>Delivery address</Text>
              </div>
              <div>
                <StyledInput
                  type="radio"
                  name="radioButton"
                  id={el.id}
                  value={el.id}
                  checked={el.id === this.state.selectedAddressId}
                  onChange={this.handleChange}
                />
                <StyledLabel htmlFor={el.id}>
                  <DefaultText size="medium" weight="regular" color="#333333">
                    Default
                  </DefaultText>
                </StyledLabel>
              </div>
            </CardTitle>
            <Address>
              <div>
                <Text color="#1557bf">{name}</Text>
              </div>
              <div>
                <Text color="#1557bf">{phone}</Text>
              </div>
              <div>
                <Text color="#1557bf">
                  {`${el.address} ${el.city} ${el.pincode}`}
                </Text>
              </div>
            </Address>
          </StyledCardContainer>
        ))}

        {type === '' && (
          <AddCardButtonWrp>
            <AddCardButton onClick={() => this.handleAddressAction('add')}>
              <Text size="xl" weight="bold">
                +
              </Text>
            </AddCardButton>
          </AddCardButtonWrp>
        )}
        {type === 'add' && (
          <EditAddress
            userToken={accessToken}
            fetch={fetch}
            onClick={this.handleAddressAction}
          />
        )}
        {type === 'edit' && (
          <EditAddress
            data={{ ...this.state.dataForEdit, name, phone }}
            onClick={this.handleAddressAction}
            fetch={fetch}
          />
        )}
      </StyledContainer>
    )
  }
}

export default AddressCard
