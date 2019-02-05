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
  DivForButton,
  ImgDiv,
} from './ExportContainers'

class EmptySearchResult extends Component {
  render() {
    return (
      <Layout noWrapper="fromMobile">
        <ErrorContainer>
          <ImgDiv>
            <Image
              srcSet="/static/EmptySearchResult/artboard-1-copy-2-4-x.png, /static/EmptySearchResult/artboard-1-copy-2-4-x@2x.png, /static/EmptySearchResult/artboard-1-copy-2-4-x@3x.png"
              width="100%"
              height="100%"
            />
          </ImgDiv>
          <ErrorInfoAndLinks marginTop="2rem" marginBelowHeading="0rem">
            <div>
              <p>
                <Text size="large" weight="bold">
                  No search results found
                </Text>
              </p>
              <p>
                <StyledText size="medium">
                  Try using other search terms to improve your results or choose
                  from our latest deals and promotions.
                </StyledText>
              </p>
            </div>
            <DivForButton marginTop="1.5rem">
              <Link href="/">
                <a>
                  <ErrorButton text="Deals & promotions" />
                </a>
              </Link>
            </DivForButton>
          </ErrorInfoAndLinks>
        </ErrorContainer>
      </Layout>
    )
  }
}

export default EmptySearchResult
