import React from 'react'
import Header from '../../containers/Header'
import Main from '../../containers/Main/Main'
import Footer from '../../containers/Footer'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
`

const Content = styled.div`
  flex: 1 0 auto;
`
const FooterWrapper = styled.footer`
  flex-shrink: 0;
`

const Layout = ({
  className,
  children,
  organizationData,
  noWrapper,
  hideCheckoutAddress,
}) => (
  <Container className={className} data-testid="layout">
    <Content>
      <Header
        organizationData={organizationData}
        hideCheckoutAddress={hideCheckoutAddress}
      />
      <Main noWrapper={noWrapper}>{children}</Main>
    </Content>
    <FooterWrapper>
      <Footer organizationData={organizationData} />
    </FooterWrapper>
  </Container>
)

Layout.defaultProps = {
  organizationData: {},
}

export default Layout
