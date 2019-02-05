import React from 'react'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'
import Text from '../Text'
import Delete from '../icons/Delete'
import CreditCard from '../icons/CreditCard'

const Card = styled.div`
  display: flex;
  flex-direction: column;

  height: 6.25rem;
  padding: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 0.25rem;
  background-color: #ffffff;
`

const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: auto;
`
const SelectCard = styled.div`
  display: block;
`
const DefaultText = styled(Text)`
  margin-right: 0.5rem;
`

const StyledButton = styled.span`
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
    background-color: ${props =>
      props.defaultCard ? '#0d3578' : 'transparent'};
  }
`
const CardDtails = styled.div`
  display: flex;
  justify-content: space-between;
`
const CardImage = styled.div`
  display: flex;
  align-items: center;
`

const CreditCardImage = styled(CreditCard)`
  height: 1.75rem;
  width: 2.75rem;
`
const CardNumber = styled.span`
  margin-left: 0.5rem;
`
const RemoveCard = styled.div`
  margin-right: 0.5rem;
`
const DeleteIcon = styled(Delete)`
  height: 1.3125rem;
  width: 1.1875rem;
  cursor: pointer;
`

const PaymentCard = props => {
  const { cardDetails, defaultCard, onRemove, onEdit, onSetDefault } = props
  if (!cardDetails || isEmpty(cardDetails)) {
    return null
  }
  // eslint-disable-next-line no-unused-vars
  const { name, cardNumber, date, cvv } = cardDetails
  return (
    <Card onClick={onEdit}>
      <CardTitle>
        <Text size="medium" weight="bold" color="#333333">
          Credit Card
        </Text>
        <SelectCard>
          <StyledButton
            defaultCard={defaultCard}
            onClick={onSetDefault}
            data-testid="defaultButton"
          >
            <DefaultText size="small" weight="bold" color="#333333">
              Default
            </DefaultText>
          </StyledButton>
        </SelectCard>
      </CardTitle>
      <CardDtails>
        <CardImage>
          <CreditCardImage />
          <CardNumber>
            <Text size="medium" color="#1557bf">
              •••• •••• •••• &nbsp;{cardNumber.substring(cardNumber.length - 4)}
            </Text>
          </CardNumber>
        </CardImage>
        <RemoveCard data-testid="removeCard" onClick={onRemove}>
          <DeleteIcon />
        </RemoveCard>
      </CardDtails>
    </Card>
  )
}

export default PaymentCard
