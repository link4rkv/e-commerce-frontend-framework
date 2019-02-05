import React, { Component } from 'react'
import styled from 'styled-components'
import Popup from '../Popup/Popup'
import { from, only } from '../../lib/Media'
import ProductDescription from '../ProductDescription/ProductDescription'
import Text from '../Text/Text'
import Star from '../icons/Star'
import PromotionActive from '../icons/PromotionsActive'

let data = {
  title: 'Terms And Conditions',
  data: `• Buy any 2x800ml participating products from Magnolia Yoghurt Smoothie and get this FREE. 
    • Limited to 1 redemption per transaction 
    • While stocks last 
    • Promotion is valid till 30 November 2018 
    • Design of the free gift is picked and given out at random 
    • For more information, click HERE to view the participating products`,
}

// dummy data for promo offer details

const PlainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  background: #ffffffff;
  opacity: 1;
  overflow-y: auto;
  scrollbar-width: none;
  padding: 1rem 0;
  width: auto;
  ${only('mobile')} {
    max-height: 28rem;
    margin: 4rem 8%;
  }
  ${from('tablet')} {
    width: 37.75rem;
    max-height: 27.5rem;
    margin: 6rem auto;
  }
`

const StyledIcon = styled.div`
  display: block;
  text-align: ${props => props.align};
  padding: ${props => props.padding || '0px'};
`

const StyledCloseButton = styled(Star)`
  cursor: ${props => props.cursor || 'inherit'};
`
const PaddedDiv = styled.div`
  padding: 1rem 1rem 0 1rem;
  ${from('tablet')} {
    padding: 1rem 0 0 2.5rem;
    margin: 1rem 0rem;
  }
`

class PromoOfferDetails extends Component {
  render() {
    return (
      <Popup onClose={this.props.onClose}>
        <PlainContainer>
          <StyledIcon align="left" padding="1rem">
            <StyledCloseButton cursor="pointer" onClick={this.props.onClose} />
          </StyledIcon>
          <StyledIcon align="center">
            <PromotionActive height={45} width={45} />
          </StyledIcon>
          <PaddedDiv>
            <Text size="xl" weight="black">
              Some heading about offer from props to be placed here
            </Text>
          </PaddedDiv>
          <PaddedDiv>
            <ProductDescription
              title={data.title}
              data={data.data}
              margin="0rem"
              padding="0rem"
            />
          </PaddedDiv>
        </PlainContainer>
      </Popup>
    )
  }
}

export default PromoOfferDetails
