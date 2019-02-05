import React, { Component } from 'react'
import Layout from '../Layout/Layout'
import Text from '../Text/Text'
import Image from '../Image/Image'
import ErrorButton from './ErrorButton'
import Link from 'next/link'
import {
  ErrorContainer,
  ErrorInfoAndLinks,
  DivForButton,
  ImgDiv,
  StyledText,
} from './ExportContainers'

class EmptyCart extends Component {
  render() {
    return (
      <Layout noWrapper="fromMobile">
        <ErrorContainer>
          <ImgDiv>
            <Image
              srcSet="/static/EmptyCart/artboard-1-copy-3-4-x.png, /static/EmptyCart/artboard-1-copy-3-4-x@2x.png, /static/EmptyCart/artboard-1-copy-3-4-x@3x.png"
              width="100%"
              height="100%"
            />
          </ImgDiv>
          <ErrorInfoAndLinks marginTop="2rem" marginBelowHeading="0">
            <div>
              <p>
                <Text size="large" weight="bold">
                  BOO… Your shopping cart is empty
                </Text>
              </p>
              <p>
                <StyledText size="medium">
                  Start adding items into your shopping cart and it will appear
                  here.
                </StyledText>
              </p>
            </div>
            <DivForButton marginTop="1.5rem">
              <Link href="/">
                <a>
                  <ErrorButton text="Start shopping" />
                </a>
              </Link>
            </DivForButton>
          </ErrorInfoAndLinks>
        </ErrorContainer>
      </Layout>
    )
  }
}

export default EmptyCart
