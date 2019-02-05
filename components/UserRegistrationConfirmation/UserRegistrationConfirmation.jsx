import React from 'react'
import styled from 'styled-components'

import TextIcon from '../TextIcon/TextIcon'
import AccountIcon from '../icons/Account'
import Text from '../Text/Text'
import Button from '../../components/Button/Button'

const StyledContainer = styled.div`
  text-align: center;
  padding: 5rem;
  background-color: #fff;
  max-width: 40rem;
  border-radius: 4px;
  margin: 0 auto;
  margin-top: 3rem;
`

const PrimaryDiv = styled.div`
  text-align: center;
`

const Title = styled(Text)`
  margin-top: 1.5rem;
`

const Description = styled(Text)`
  margin-top: 0.5rem;
`

const ShopNowButton = styled(Button)`
  width: 17rem;
  height: 3rem;
  margin-top: 2.5rem;
  border-radius: 1.5rem;
  background-color: #1557bf;
  font-size: 0.875rem;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
`

const UserRegistrationConfirmation = () => {
  return (
    <StyledContainer>
      <PrimaryDiv>
        <TextIcon>
          <AccountIcon width="41" height="41" />
        </TextIcon>
        <Title as="h3" size="large" weight="bold" color="#333333">
          Hi Anne!
        </Title>
        <Description as="p" size="medium" weight="regular" color="#333333">
          Your account has been created.
        </Description>
      </PrimaryDiv>
      <ShopNowButton>Ok, got it.</ShopNowButton>
    </StyledContainer>
  )
}

export default UserRegistrationConfirmation
