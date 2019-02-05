import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Text from '../Text/Text'
import { only, from } from '../../lib/Media'
import { WrpDiv } from '../../containers/Main/Main'
import NoImg from '../icons/NoImg'
import CarouselChervonTop from '../icons/CarouselChevronTop'

const FooterContainer = styled(WrpDiv)`
  display: flex;
  position: relative;
  bottom: 0;
  background-color: #fff;
  flex-direction: column;
  > div:not(:last-child) {
    margin-bottom: 1rem;
  }
  ${from('desktop')} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`

const ContainerForLinks = styled.div`
  display: flex;
  flex-direction: column;
  color: #1557bf;
  > div:not(:last-child) {
    margin-bottom: 1rem;
  }
  ${from('tablet')} {
    flex-direction: row;
    flex-wrap: wrap;
    > div {
      width: 50%;
    }
  }
  ${only('desktop')} {
    width: 50%;
  }
  ${from('hd')} {
    width: 40%;
  }
  ${from('uhd')} {
    width: 25%;
  }
`
const ContainerForExternalLinks = styled.div`
  display: flex;
  flex-direction: column;
  color: #1557bf;
  > div:not(:last-child) {
    margin-bottom: 1rem;
  }
  ${from('hd')} {
    width: 60%;
    flex-direction: row;
    > div:not(:last-child) {
      margin-right: 5rem;
    }
  }
`

const StyledA = styled.a`
  text-decoration: none;
  color: #1557bf;

  :not(:last-child) {
    padding-bottom: 0.5rem;
  }
`

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  > span:not(:last-child) {
    padding-bottom: 0.5rem;
  }
`

const StoreDiv = styled.div`
  display: flex;
  flex-direction: column;
  > span:not(:last-child) {
    padding-bottom: 0.5rem;
  }
`

const PaymentsDiv = styled.div`
  display: flex;
  flex: 1;
  > svg:not(:last-child) {
    margin-right: 0.75rem;
  }
`
const SocialMediaDiv = styled.div`
  display: flex;
  flex: 1;
  > svg:not(:last-child) {
    margin-right: 0.75rem;
  }
`

const AppStoreDiv = styled.div`
  display: flex;
  flex: 1;
  > svg:not(:last-child) {
    margin-right: 0.75rem;
  }
`

const Heading = styled.div`
  color: #696969;
  padding-bottom: 0.5rem;
`
const StyledTop = styled.div`
  position: absolute;
  right: 0.5rem;
  top: -1.5rem;
  cursor: pointer;
  ${from('tablet')} {
    right: 1.8rem;
  }
  ${from('desktop')} {
    right: 2.8rem;
  }
`

const PaymentAndSocialMediaDiv = styled.div`
  > div:not(:last-child) {
    margin-bottom: 1rem;
  }
  display: flex;
  flex-direction: column;
  ${only('tablet')} {
    flex-direction: row;
    > div {
      width: 50%;
    }
  }
  ${from('uhd')} {
    flex-direction: row;
    > div:not(:last-child) {
      margin-right: 3.5rem;
    }
  }
`
const BarCodeDiv = styled.div`
  display: none;
  ${from('desktop')} {
    display: block;
    padding: 0.25rem 0 0.5rem 0;
  }
`

const StyledText = styled(Text)`
  cursor: pointer;
  display: span;
`
const StyledImg = styled(NoImg)`
  cursor: pointer;
`

class PageFooter extends Component {
  constructor() {
    super()
    this.handleScrollToTop = this.handleScrollToTop.bind(this)
  }

  handleScrollToTop() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <FooterContainer>
        <StyledTop onClick={this.handleScrollToTop}>
          <CarouselChervonTop />
        </StyledTop>
        <ContainerForLinks>
          <InfoDiv>
            {Object.keys(links).map(path => (
              <Link href={links[path] || '#'} key={path} passHref>
                <StyledA>
                  <StyledText size="small" weight="bold">
                    {path}
                  </StyledText>
                </StyledA>
              </Link>
            ))}
          </InfoDiv>
          <div>
            <Heading>
              <Text size="small">OUR STORES</Text>
            </Heading>
            <StoreDiv>
              {stores.map(e => (
                <Link href={e.link} key={e.name}>
                  <span>
                    <StyledText size="small" weight="bold">
                      {e.name}
                    </StyledText>
                  </span>
                </Link>
              ))}
            </StoreDiv>
          </div>
        </ContainerForLinks>
        <ContainerForExternalLinks>
          <PaymentAndSocialMediaDiv>
            <div>
              <Heading>
                <Text size="small">SECURE PAYMENT METHODS</Text>
              </Heading>
              <PaymentsDiv>
                {payments.map(e => (
                  <Link href="#" key={e}>
                    <StyledImg />
                  </Link>
                ))}
              </PaymentsDiv>
            </div>
            <div>
              <Heading>
                <Text size="small">FOLLOW US ON</Text>
              </Heading>
              <SocialMediaDiv>
                {social.map(e => (
                  <Link href="#" key={e}>
                    <StyledImg />
                  </Link>
                ))}
              </SocialMediaDiv>
            </div>
          </PaymentAndSocialMediaDiv>
          <div>
            <Heading>
              <Text size="small">DOWNLOAD OUR APP</Text>
            </Heading>
            <BarCodeDiv>
              <StyledImg />
            </BarCodeDiv>
            <AppStoreDiv>
              {appStore.map(e => (
                <Link href="#" key={e}>
                  <StyledImg />
                </Link>
              ))}
            </AppStoreDiv>
          </div>
        </ContainerForExternalLinks>
      </FooterContainer>
    )
  }
}

export default PageFooter
const links = {
  Help: 'https://help.fairprice.com.sg/access/unauthenticated?theme=hc',
  'About us': '/page/about-us',
  'Lucky Draw': 'https://luckydraw.fairprice.com.sg/UserPortal/welcome',
  'Plus!': '',
  Recipes: '',
  'Tips for you': '',
  'Store weekly ads': '',
  'Stretch your dollar': '',
}
const stores = [
  { name: 'Store locator', link: '/store-locator' },
  { name: 'Loyalty programme', link: '#' },
  { name: 'Types of retail shops', link: '#' },
  { name: 'Events', link: '#' },
  { name: 'Retails format', link: '#' },
]
const payments = ['Master card', 'Visa', 'American express']
const social = ['Facebook', 'Youtube', 'Twitter']
const appStore = ['Play store', 'Apple store']
