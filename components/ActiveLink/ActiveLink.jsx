import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import Link from 'next/link'

const StyledAnchor = styled.a`
  color: #1557bf;
  text-decoration: none;
`

export const matchPathname = (router, href) => router.pathname === href

class ActiveLink extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children, href, active, activeWhen, router, className } = this.props
    const isActive = activeWhen(router, href)

    if (href.charAt(0) === '#')
      return (
        <StyledAnchor href={href} className={className}>
          {isActive ? active : children}
        </StyledAnchor>
      )

    // Add new stuff to commit.

    return (
      <Link passHref href={href}>
        <StyledAnchor className={className}>
          {isActive ? active : children}
        </StyledAnchor>
      </Link>
    )
  }
}

ActiveLink.defaultProps = {
  activeWhen: () => false,
}

export default withRouter(ActiveLink)
