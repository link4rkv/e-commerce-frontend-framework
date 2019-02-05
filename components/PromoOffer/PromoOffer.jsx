import React, { Component } from 'react'
import styled from 'styled-components'
import SvgStar from '../icons/Star'
import Text from '../Text/Text'
import Image from '../Image/Image'
import PromoOffertDetails from './PromoOfferDetails'

const PlainContainer = styled.div`
  display: block;
`

const OfferContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 0.0625rem solid red;
  border-radius: 0.3rem;
  justify-content: space-between;
`
const OfferImageAndDetails = styled.div`
  display: flex;
  align-items: center;
`

const OfferDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
`

const OfferHeading = styled.h1`
  color: #ea6100;
`
const OfferSubHeading = styled.p`
  color: #333333;
`

class PromoOffers extends Component {
  constructor() {
    super()
    this.state = {
      modalOpen: false,
    }

    this.handleModalOpen = this.handleModalOpen.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
  }

  handleModalOpen() {
    this.setState({
      modalOpen: true,
    })
  }

  handleModalClose() {
    this.setState({
      modalOpen: false,
    })
  }

  render() {
    return (
      <PlainContainer>
        <OfferContainer onClick={this.handleModalOpen}>
          <OfferImageAndDetails>
            <Image
              src="https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg"
              width={30}
              height={30}
            />
            <OfferDetails>
              <OfferHeading>
                <Text size="small" weight="bold">
                  Buy 25+ free travel pillow
                </Text>
              </OfferHeading>
              <OfferSubHeading>
                <Text size="small">Till 31st december 2018</Text>
              </OfferSubHeading>
            </OfferDetails>
          </OfferImageAndDetails>
          <SvgStar />
        </OfferContainer>
        {this.state.modalOpen ? (
          <PromoOffertDetails onClose={this.handleModalClose} />
        ) : null}
      </PlainContainer>
    )
  }
}

export default PromoOffers
