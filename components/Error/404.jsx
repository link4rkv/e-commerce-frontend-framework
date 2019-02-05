import React, { Component } from 'react'
import Layout from '../Layout/Layout'
import Text from '../Text/Text'
import Link from 'next/link'
import Image from '../Image/Image'
import {
  ErrorContainer,
  ErrorInfoAndLinks,
  ImgDiv,
  StyledText,
  LinkText,
  LinksDiv,
} from './ExportContainers'

class Error404 extends Component {
  render() {
    return (
      <Layout noWrapper="fromMobile" hideCheckoutAddress>
        <ErrorContainer>
          <ImgDiv>
            <Image
              srcSet="/static/404/artboard-1-copy-4-4-x-copy.png, /static/404/artboard-1-copy-4-4-x-copy@2x.png, /static/404/artboard-1-copy-4-4-x-copy@3x.png"
              width="100%"
              height="100%"
            />
          </ImgDiv>
          <ErrorInfoAndLinks>
            <div>
              <p>
                <StyledText size="small" weight="black" letterSpacing="1px">
                  ERROR CODE: 404
                </StyledText>
              </p>
              <p>
                <Text size="large" weight="bold" color="#333333">
                  Opps. Seems like you are lost in space
                </Text>
              </p>
              <p>
                <StyledText size="medium">
                  Jump to these page instead:
                </StyledText>
              </p>
            </div>
            <LinksDiv marginTop="1rem">
              <p>
                <Link href="/">
                  <LinkText size="medium">Home</LinkText>
                </Link>
              </p>
              <p>
                <Link href="/search">
                  <LinkText size="medium">Search</LinkText>
                </Link>
              </p>
              <p>
                <Link href="/categories">
                  <LinkText size="medium">Categories</LinkText>
                </Link>
              </p>
            </LinksDiv>
          </ErrorInfoAndLinks>
        </ErrorContainer>
      </Layout>
    )
  }
}

export default Error404
