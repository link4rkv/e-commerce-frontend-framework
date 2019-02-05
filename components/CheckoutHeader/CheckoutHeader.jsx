import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import Logo from '../icons/Logo'
import LogoDesktop from '../icons/LogoTabletDesktop'
import Remove from '../icons/Remove'

import { from, visible } from '../../lib/Media'

const StyledHeader = styled.header`
  background-color: #ffffff;
`

const CheckoutText = styled.span`
  color: #333333;
  font-weight: bold;
`

const StyledRemoveIcon = styled(Remove)`
  height: 1.5rem;
  width: 1.5rem;
`

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.75rem;

  ${from('desktop')} {
    padding: 1rem 2rem;
  }

  ${from('hd')} {
    padding: 1rem 3.5rem;
  }
`
const MobileTabletLogo = styled(Logo)`
  ${from('desktop')} {
    display: none;
  }
`

const DesktopLogo = styled(LogoDesktop)`
  ${visible(from('desktop'))}
`

const CheckoutHeader = ({ className, onClose, title }) => (
  <StyledHeader className={className}>
    <Wrapper>
      <Link href="/">
        <a>
          <MobileTabletLogo bgColor="#ffffff" height="40" width="40" />
          <DesktopLogo height="40" width="120" />
        </a>
      </Link>
      <CheckoutText>{title || 'Checkout'}</CheckoutText>
      {onClose ? (
        <StyledRemoveIcon onClick={onClose} />
      ) : (
        <Link href="/cart">
          <a>
            <Remove />
          </a>
        </Link>
      )}
    </Wrapper>
  </StyledHeader>
)

export default CheckoutHeader
