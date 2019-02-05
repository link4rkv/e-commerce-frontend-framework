import React, { Component } from 'react'
import Layout from '../Layout/Layout'
import Text from '../Text/Text'
import Image from '../Image/Image'
import ErrorButton from './ErrorButton'
import Link from 'next/link'
import {
  ErrorContainer,
  ErrorInfoAndLinks,
  StyledText,
  ImgDiv,
  DivForButton,
} from './ExportContainers'

class EmptyShoppingList extends Component {
  render() {
    return (
      <Layout noWrapper="fromMobile">
        <ErrorContainer>
          <ImgDiv>
            <Image
              srcSet="/static/EmptyShoppingList/artboard-1-copy-4-4-x-copy.png, /static/EmptyShoppingList/artboard-1-copy-4-4-x-copy@2x.png, /static/EmptyShoppingList/artboard-1-copy-4-4-x-copy@3x.png"
              width="100%"
              height="100%"
            />
          </ImgDiv>
          <ErrorInfoAndLinks marginTop="2rem" marginBelowHeading="0rem">
            <div>
              <p>
                <Text size="large" weight="bold">
                  Your shopping list is empty
                </Text>
              </p>
              <p>
                <StyledText size="small">
                  Start adding items you love in the shopping list. Lorem ipsum
                  dolor set amet consectur.
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

export default EmptyShoppingList
