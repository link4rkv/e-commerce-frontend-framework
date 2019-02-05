import React from 'react'
import styled from 'styled-components'
import { InlineBlock, Button, Popover } from 'reakit'
import { CheckoutAddressConsumer } from '../CheckoutAddressProvider'

import { from, visible, only } from './../../lib/Media'

import HomeInactiveIcon from '../icons/HomeInactive'
import CategoryInactiveIcon from '../icons/CategoryInactive'
import PromotionsInactiveIcon from '../icons/PromotionsInactive'
import OrdersInactiveIcon from '../icons/OrdersInactive'

import HomeActiveIcon from '../icons/HomeActive'
import CategoryActiveIcon from '../icons/CategoryActive'
import PromotionsActiveIcon from '../icons/PromotionsActive'
import OrdersActiveIcon from '../icons/OrdersActive'

import MoreIcon from '../icons/More'

import TextIcon from './../TextIcon'
import ActiveLink from './../ActiveLink'

import DeliveryPickupForm from '../DeliveryPickupForm'

const AdditionLinks = styled.ul`
  display: flex;
  flex-direction: column;

  line-height: 1.5;

  > li {
    margin-bottom: 1.5rem;
  }
`

const StyledUl = styled.ul`
  background-color: white;
  height: ${({ mobileView }) => (mobileView ? 'auto' : '0')};
  display: flex;
  flex-direction: column;
  align-items: ${({ mobileView }) => (mobileView ? 'flex-start' : 'center')};

  > li {
    margin-bottom: 1.5rem;
  }

  > li:last-child {
    display: none;
    ${({ mobileView }) => mobileView && `margin-bottom: 0.85rem`}
  }

  > li:not(.header-adress-selector-container) {
    ${props =>
      props.mobileView ? visible(only('mobile')) : visible(from('tablet'))};
  }

  ${from('tablet')} {
    flex-direction: row;
    border: none;
    margin-top: 1.5rem;
    height: auto;

    > li {
      margin-bottom: 0;
    }

    > li + li {
      margin-left: 2rem;
    }

    > li:nth-last-child(2) {
      margin-left: auto;
    }

    > li:last-child {
      display: block;
      margin-left: 1rem;
    }
  }
`

const StyledNavLabel = styled.span`
  margin-left: 0.25rem;
  font-size: 1rem;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`

const StyledPopover = styled(Popover)`
  background-color: white;
  border-radius: 0.5rem;
  width: 21.5rem;
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  box-shadow: 0 13px 15px 0 rgba(0, 0, 0, 0.12);
`

const PopoverToggleButton = styled(Button)`
  outline: none;

  /* IE11 */
  border: none;
  background: none;
  /* end IE11 */
`

const navigationLinks = [
  {
    label: 'Home',
    url: '/',
    inactive: HomeInactiveIcon,
    active: HomeActiveIcon,
  },
  {
    label: 'Categories',
    url: '/categories',
    inactive: CategoryInactiveIcon,
    active: CategoryActiveIcon,
  },
  {
    label: 'Promotions',
    url: '/promotions',
    inactive: PromotionsInactiveIcon,
    active: PromotionsActiveIcon,
  },
  // {
  //   label: 'Notifications',
  //   url: '/notifications',
  //   inactive: NotificationInactiveIcon,
  //   active: NotificationActiveIcon,
  // },
  {
    label: 'Orders',
    url: '/orders',
    inactive: OrdersInactiveIcon,
    active: OrdersActiveIcon,
  },
]

class HeaderNavigation extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      className,
      mobileView,
      organizationData,
      hideCheckoutAddress,
    } = this.props

    return (
      <nav className={className}>
        <StyledUl mobileView={mobileView}>
          {navigationLinks.map(
            ({ label, url, inactive: InactiveIcon, active: ActiveIcon }) => (
              <li key={label}>
                <ActiveLink
                  href={url}
                  active={
                    <TextIcon prefix={<ActiveIcon width="16" height="16" />}>
                      <StyledNavLabel bold>{label}</StyledNavLabel>
                    </TextIcon>
                  }
                  activeWhen={(router, href) => router.pathname === href}
                >
                  <TextIcon prefix={<InactiveIcon width="16" height="16" />}>
                    <StyledNavLabel>{label}</StyledNavLabel>
                  </TextIcon>
                </ActiveLink>
              </li>
            )
          )}
          {!mobileView && (
            <li className="header-adress-selector-container">
              <CheckoutAddressConsumer>
                {({ checkoutAddress, update }) => (
                  <DeliveryPickupForm
                    organizationData={organizationData}
                    checkoutAddress={checkoutAddress}
                    updateCheckoutAddress={update}
                    hideCheckoutAddress={hideCheckoutAddress}
                  />
                )}
              </CheckoutAddressConsumer>
            </li>
          )}
          {!mobileView && (
            <li>
              <Popover.Container>
                {popover => (
                  <InlineBlock relative>
                    <PopoverToggleButton as={Popover.Toggle} {...popover}>
                      <MoreIcon title="More" />
                    </PopoverToggleButton>
                    <StyledPopover
                      hideOnClickOutside
                      placement="top-end"
                      {...popover}
                    >
                      <AdditionalNavigation />
                    </StyledPopover>
                  </InlineBlock>
                )}
              </Popover.Container>
            </li>
          )}
        </StyledUl>
      </nav>
    )
  }
}

HeaderNavigation.defaultProps = {}

const additionalLinks = [
  {
    label: 'Coupon',
    url: '/coupon',
  },
  {
    label: 'Shopping List',
    url: '/cart',
  },
  {
    label: 'Membership',
    url: '/member',
  },
  {
    label: 'e-Lucky Draw',
    url: 'https://luckydraw.fairprice.com.sg/UserPortal/welcome',
  },
  {
    label: 'Store Locator',
    url: '/store-locator',
  },
  {
    label: 'Events',
    url: '/events',
  },
]

export class AdditionalNavigation extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <AdditionLinks>
        {additionalLinks.map(({ label, url }) => (
          <li key={url}>
            <ActiveLink href={url}>{label}</ActiveLink>
          </li>
        ))}
      </AdditionLinks>
    )
  }
}

export default HeaderNavigation
