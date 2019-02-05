import React from 'react'
import styled from 'styled-components'
import Text from '../Text'

const StyledPromocode = styled.div`
  display: flex;
  padding: 1rem;
  background-color: #ffffff;
  border: 1px solid ${props => props.borderColor || '#eaeaea'};
  cursor: ${props => (props.borderColor ? 'unset' : 'pointer')};
  border-radius: 4px;
`

const OfferDetails = styled.div`
  flex: 1;
`

const OfferHeading = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const OfferDetail = styled(Text)`
  margin-bottom: 4px;
  overflow: hidden;
  margin-right: 3rem;
`

const OfferSubDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`

const OfferValidity = styled(Text)`
  overflow: hidden;
`

const TermsAndCondition = styled(Text)`
  text-decoration: none;
`

const RemoveOfferButton = styled.button`
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

const Promocode = props => {
  const { promocode, borderColor, onRemove, onApply } = props
  return (
    <StyledPromocode
      borderColor={borderColor}
      onClick={onApply}
      data-testid="promocode"
    >
      <OfferDetails>
        <OfferHeading>
          <Text as="h1" size="medium" weight="bold" color="#ea6100">
            {promocode}
          </Text>
          {onRemove && (
            <RemoveOfferButton onClick={onRemove} data-testid="removePromocode">
              <Text size="small" color="#696969" weight="bold">
                Remove
              </Text>
            </RemoveOfferButton>
          )}
        </OfferHeading>
        <OfferDetail as="p" size="medium" weight="regular" color="#333333">
          $8 off for oders above $80
        </OfferDetail>
        <OfferSubDetails>
          <OfferValidity as="p" size="small" weight="bold" color="#696969">
            Valid till 21st Dec 2019
          </OfferValidity>
          <TermsAndCondition
            as="a"
            href=""
            size="small"
            weight="bold"
            color="#1557bf"
          >
            T&amp;Cs
          </TermsAndCondition>
        </OfferSubDetails>
      </OfferDetails>
    </StyledPromocode>
  )
}

export default Promocode
