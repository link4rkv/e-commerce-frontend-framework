import React from 'react'
import styled from 'styled-components'
import { InlineBlock, Button as RButton, Popover, Divider } from 'reakit'
import Link from 'next/link'

import { from, visible, only } from './../../lib/Media'

import { CartConsumer } from './../CartProvider'

import Text from '../Text'
import CartIcon from '../icons/Cart'
import DeliveryActiveIcon from '../icons/DeliveryActive'
import DeliveryInactiveIcon from '../icons/DeliveryInactive'
//import Logo from '../icons/Logo'
//import BigLogo from '../icons/LogoTabletDesktop'
import AccountIcon from '../icons/Account'
import HelpIcon from '../icons/Help'
import Expand from '../icons/Expand'
import Collapse from '../icons/Collapse'
import { createGlobalStyle } from 'styled-components'
import CompactProduct from './../CompactProduct'
import Price from './../Price'
import Search from './../Search'
import TextIcon from './../TextIcon'
import HeaderNavigation, { AdditionalNavigation } from './../HeaderNavigation'

const GlobalStyle = createGlobalStyle`
  body {
    overflow: ${({ hide }) => (hide ? 'hidden' : 'auto')};
  }
`

const Block = styled.div`
  background-color: white;
  padding: 1rem;
  width: 100vw;
`

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #eaeaea;
`

const StyledContainer = styled.div`
  width: 100%;
  padding: 1rem;

  ${from('tablet')} {
    padding: 1.5rem 2rem;
  }

  ${from('desktop')} {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  ${from('hd')} {
    padding-left: 3.5rem;
    padding-right: 3.5rem;
  }
`

const StyledRButton = styled(RButton)`
  display: flex;
  align-items: center;
  outline: none;

  /* IE11 */
  border: none;
  background: none;
  /* end IE11 */
`

const MobileNavPopover = styled(Popover)`
  top: 4rem;
  transform: unset !important;
  height: calc(100vh - 4rem);
  overflow-y: auto;

  ${visible(only('mobile'))};
`

const StyledSearchResults = styled.ul`
  max-height: calc(100vh - 23.5rem);
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 4px;

  ${from('tablet')} {
    max-height: 23rem;
  }

  ${from('hd')} {
    > a {
      display: inline-block;
      width: calc((100% - 1rem) / 2);
    }

    > a:nth-child(odd) {
      margin-right: 1rem;
    }
  }
`

const StyledCompactProduct = styled(CompactProduct)`
  margin-right: 0;
  margin-bottom: 0.5rem;
  width: 100%;
`

const StyledCartButton = styled.a`
  background-color: #1557bf;
  border: none;
  color: white;
  border-radius: 0.75rem;
  margin-left: 0.8rem;
  padding: 0.2rem 0.3rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
`

const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  ${from('tablet')} {
    margin-bottom: 0;
  }
`

const StyledDeliveryCart = styled.div`
  display: flex;

  > span,
  > button {
    margin-left: 1rem;
    cursor: pointer;
  }
`

// const MobileLogo = styled(Logo)`
//   ${visible(only('mobile'))};
// `

const StyledA = styled.a`
  text-decoration: none;
  color: black;
`

const MobileLogo = styled.img`
  object-fit: contain;
  ${visible(only('mobile'))};
`

const MobileNavToggleIcon = styled.div`
  color: #1557bf;
  ${visible(only('mobile'))};
`
// const TabletLogo = styled(BigLogo)`
//   ${visible(from('tablet'))};
// `
const TabletLogo = styled.img`
  ${visible(from('tablet'))};
`

const MobileSearch = styled(Search)`
  ${visible(only('mobile'))};
`

const TabletSearch = styled(Search)`
  ${visible(from('tablet'))};

  max-width: 45rem;
`

const TabletTextIcon = styled(TextIcon)`
  ${visible(from('tablet'))};
`

const DesktopTextIcon = styled(TextIcon)`
  ${visible(from('desktop'))};
`

const renderCompacted = items => (
  <StyledSearchResults>
    {items.map(product => (
      <StyledCompactProduct key={product.id} details={product} />
    ))}
  </StyledSearchResults>
)

class PageHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
    }
  }

  componentDidMount() {
    if (this.props.isLoggedIn()) {
      this.setState({ isLoggedIn: true })
    }
  }

  render() {
    const {
      minSpendForFreeDelivery,
      currentSpend,
      organizationData,
      hideCheckoutAddress,
    } = this.props

    const hasFreeDelivery = currentSpend >= minSpendForFreeDelivery
    const DeliveryIconComponent = hasFreeDelivery
      ? DeliveryActiveIcon
      : DeliveryInactiveIcon
    const { isLoggedIn } = this.state
    return (
      <StyledWrapper>
        <StyledContainer>
          <StyledInfo>
            <Popover.Container>
              {popover => (
                <InlineBlock relative>
                  <StyledRButton
                    as={Popover.Toggle}
                    {...popover}
                    aria-label="FairPrice logo"
                  >
                    {/* <MobileLogo
                      title="FairPrice logo"
                      width="40"
                      height="40"
                      data-testid="mobile-logo"
                    /> */}
                    <MobileLogo
                      src="/static/zs-logo.png"
                      width="40px"
                      height="40px"
                      title="Zopsmart logo"
                      data-testid="mobile-logo"
                    />
                    <MobileNavToggleIcon data-testid="mobile-nav-toggle">
                      {popover.visible ? <Collapse /> : <Expand />}
                    </MobileNavToggleIcon>
                  </StyledRButton>
                  <MobileNavPopover
                    hideOnClickOutside
                    placement="bottom"
                    {...popover}
                    fixed
                    data-testid="mobile-nav"
                  >
                    {popover.visible && (
                      <React.Fragment>
                        <GlobalStyle hide={true} />
                        <Block>
                          <HeaderNavigation mobileView />
                          <Divider />
                          <AdditionalNavigation />
                        </Block>
                      </React.Fragment>
                    )}
                  </MobileNavPopover>
                </InlineBlock>
              )}
            </Popover.Container>
            <h1>
              <Link href="/" passHref>
                <a aria-label="FairPrice Logo">
                  {/* <TabletLogo title="FairPrice logo" width="120" height="40" /> */}
                  <TabletLogo
                    src="/static/zs-logo.png"
                    height="40px"
                    title="Zopsmart logo"
                  />
                </a>
              </Link>
            </h1>

            <TabletSearch
              renderResults={renderCompacted}
              checkoutAddress={this.props.checkoutAddress}
            />

            <StyledDeliveryCart>
              <TextIcon
                suffix={
                  <DeliveryIconComponent
                    title={
                      hasFreeDelivery ? 'Free delivery' : 'No free delivery'
                    }
                    width="24"
                    height="24"
                  />
                }
              >
                <Text
                  size="small"
                  color={hasFreeDelivery ? '#0b8043' : '#696969'}
                >
                  {hasFreeDelivery ? (
                    'FREE Delivery!'
                  ) : (
                    <React.Fragment>
                      <Price amount={minSpendForFreeDelivery} /> for FREE
                      delivery
                    </React.Fragment>
                  )}
                </Text>
              </TextIcon>

              <TabletTextIcon>
                <Link href={isLoggedIn ? '/accounts' : '/login'} passHref>
                  <StyledA>
                    <AccountIcon width="22" height="22" />
                  </StyledA>
                </Link>
              </TabletTextIcon>

              <DesktopTextIcon>
                <Link
                  href="https://help.fairprice.com.sg/access/unauthenticated?theme=hc"
                  passHref
                >
                  <StyledA>
                    <HelpIcon width="22" height="22" />
                  </StyledA>
                </Link>
              </DesktopTextIcon>
              <Link href="/cart" passHref>
                <StyledCartButton>
                  <TextIcon
                    prefix={
                      <CartIcon title="Shopping cart" width="16" height="16" />
                    }
                  >
                    <Text size="small" color="#ffffff">
                      <CartConsumer>{({ count }) => count}</CartConsumer>
                    </Text>
                  </TextIcon>
                </StyledCartButton>
              </Link>
            </StyledDeliveryCart>
          </StyledInfo>

          <MobileSearch
            renderResults={renderCompacted}
            checkoutAddress={this.props.checkoutAddress}
          />

          <HeaderNavigation
            organizationData={organizationData}
            hideCheckoutAddress={hideCheckoutAddress}
          />
        </StyledContainer>
      </StyledWrapper>
    )
  }
}

PageHeader.defaultProps = {
  minSpendForFreeDelivery: 99.9,
  currentSpend: 0,
}

export default PageHeader
