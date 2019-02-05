import React from 'react'
import styled from 'styled-components'
import Popup from '../Popup'
import Text from '../Text'
import isEmpty from 'lodash/isEmpty'
import { from } from '../../lib/Media'

const StyledContainer = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 0.5rem;
  box-shadow: 0 0.81rem 0.94rem 0 rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  text-align: center;

  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 2rem auto 0 auto;
  padding: 2.5rem 1.5625rem;
  width: 20.5rem;
  min-height: 12rem;

  ${from('tablet')} {
    width: 37.75rem;
    height: 27.5rem;
    padding-top: 5rem;
    margin-top: 4.625rem;
  }
`

const Heading = styled(Text)`
  margin-bottom: 0.5rem;
`

const Message = styled(Text)`
  margin-bottom: 1.5rem;
`

const Button = styled.button`
  padding: 0.5rem 1.5rem;
  border: 1px solid #1557bf;
  width: 12.4rem;
  height: 2.25rem;
  border-radius: 1.125rem;
  cursor: pointer;
  margin-right: 1.25rem;
  background-color: #1557bf;

  &:focus {
    outline: none;
  }
`

const UpdateNotification = props => {
  const { onProceed, notification } = props

  if (!notification || isEmpty(notification)) {
    return null
  }

  const { title, message } = notification

  return (
    <Popup bgColor="#f3f5f7e6" onClose={onProceed}>
      <StyledContainer data-testid="updateNotification">
        <Heading as="h1" size="xl" weight="bold" color="#333333">
          {title}
        </Heading>
        <Message as="p" size="medium" weight="regular" color="#333333">
          {message}
        </Message>
        <Button onClick={onProceed}>
          <Text size="medium" weight="bold" color="#ffffff">
            Okay, got it
          </Text>
        </Button>
      </StyledContainer>
    </Popup>
  )
}

export default UpdateNotification
