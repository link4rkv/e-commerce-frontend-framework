import React, { Component } from 'react'
import styled from 'styled-components'
import cloneDeep from 'lodash/cloneDeep'
import PaymentCard from '../PaymentCard'
import { from } from '../../lib/Media'
import Text from '../Text'
import EditPayment from './EditPayment'
import ConfirmationNotification from '../ConfirmationNotification'

const StyledContainer = styled.div`
  margin: 0.875rem auto 0 auto;

  ${from('tablet')} {
    margin-top: 1.875rem;

    width: 43rem;
    display: flex;
    flex-wrap: wrap;
  }
`

const PaymentCardWrp = styled.div`
  margin-bottom: 1rem;
  max-width: 20.5rem;
  width: 100%;

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
  height: 6.25rem;
  padding: 1.875rem;
  text-align: center;
  border: 1px solid #eaeaea;
`

const AddCardButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #1557bf;
  border-radius: 16rem;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

class Payment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      defaultCardIndex: -1,
      cardAction: '',
      showRemoveCardPopup: 'No',
      cardsDetails: [
        {
          name: 'RAVAN',
          cardNumber: '1234 5678 9123 3214',
          date: '02/2030',
          cvv: '678',
        },
        {
          name: 'FANTUS',
          cardNumber: '1234 5678 9123 3214',
          date: '02/2030',
          cvv: '678',
        },
      ],
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemoveCard = this.handleRemoveCard.bind(this)
    this.handleEditCard = this.handleEditCard.bind(this)
    this.handleAddCard = this.handleAddCard.bind(this)
    this.handleConfirmationPopup = this.handleConfirmationPopup.bind(this)
    this.handleDefaultCard = this.handleDefaultCard.bind(this)
  }

  handleClose() {
    this.setState({
      cardAction: '',
      showRemoveCardPopup: 'No',
    })
  }

  handleSubmit(cardDetails, index) {
    this.setState(prevState => {
      const newCardsDetails = cloneDeep(prevState.cardsDetails)
      if (index >= 0) {
        newCardsDetails[index] = cardDetails // to update the edited values
      } else {
        newCardsDetails.push(cardDetails) // to add new card
      }
      return {
        cardsDetails: newCardsDetails,
        cardAction: '',
      }
    })
  }

  handleConfirmationPopup(e, index) {
    e.stopPropagation()
    this.index = index // storing index value to delet card after confirmation
    this.setState({
      showRemoveCardPopup: 'Yes',
    })
  }

  handleRemoveCard() {
    const index = this.index

    this.setState(prevState => {
      const newCardsDetails = cloneDeep(prevState.cardsDetails)
      newCardsDetails.splice(index, 1)
      return {
        cardsDetails: newCardsDetails,
        cardAction: '',
        showRemoveCardPopup: 'No',
      }
    })
  }

  handleEditCard(index) {
    this.setState({
      cardAction: 'Edit',
      cardIndex: index,
    })
  }

  handleAddCard() {
    this.setState({
      cardAction: 'Add',
    })
  }

  handleDefaultCard(e, index) {
    e.stopPropagation()
    this.setState({
      defaultCardIndex: index,
    })
  }

  render() {
    const {
      cardAction,
      cardsDetails,
      cardIndex,
      defaultCardIndex,
      showRemoveCardPopup,
    } = this.state
    return (
      <StyledContainer>
        {cardsDetails.map((cardDetails, index) => {
          return (
            <PaymentCardWrp key={index}>
              <PaymentCard
                defaultCard={index === defaultCardIndex} // to appil default card check
                cardDetails={cardDetails}
                onSetDefault={e => {
                  this.handleDefaultCard(e, index)
                }}
                onRemove={e => {
                  this.handleConfirmationPopup(e, index)
                }}
                onEdit={
                  cardAction == ''
                    ? () => {
                        this.handleEditCard(index)
                      }
                    : undefined
                }
              />
            </PaymentCardWrp>
          )
        })}
        {cardAction === '' && (
          <AddCardButtonWrp>
            <AddCardButton onClick={this.handleAddCard}>
              <Text size="xxl" weight="regular" color="#ffffff">
                +
              </Text>
            </AddCardButton>
          </AddCardButtonWrp>
        )}
        {cardAction === 'Add' && (
          <EditPayment
            onSubmit={this.handleSubmit}
            onClose={this.handleClose}
            title={cardAction}
          />
        )}
        {cardAction === 'Edit' && (
          <EditPayment
            onSubmit={this.handleSubmit}
            onClose={this.handleClose}
            cardDetails={cardsDetails[cardIndex]}
            index={cardIndex}
            title={cardAction}
          />
        )}
        {showRemoveCardPopup === 'Yes' && (
          <ConfirmationNotification
            onClose={this.handleClose}
            onProceed={this.handleRemoveCard}
            notification={{
              title: 'Delete card',
              message: 'do you wanna delete this card',
            }}
          />
        )}
      </StyledContainer>
    )
  }
}

export default Payment
