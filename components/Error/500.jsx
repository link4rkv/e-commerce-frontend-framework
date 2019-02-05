import React, { Component } from 'react'
import Layout from '../Layout/Layout'
import Text from '../Text/Text'
import Image from '../Image/Image'
import ErrorButton from './ErrorButton'
import {
  ErrorContainer,
  ErrorInfoAndLinks,
  StyledText,
  ImgDiv,
  DivForButton,
} from './ExportContainers'

class Error500 extends Component {
  render() {
    return (
      <Layout noWrapper="fromMobile" hideCheckoutAddress>
        <ErrorContainer>
          <ImgDiv>
            <Image
              srcSet="/static/500/artboard-1-4-x.png, /static/500/artboard-1-4-x@2x.png /static/500/artboard-1-4-x@3x.png"
              width="100%"
              height="100%"
            />
          </ImgDiv>
          <ErrorInfoAndLinks>
            <div>
              <p>
                <StyledText size="small" weight="black" letterSpacing="1px">
                  ERROR CODE: 500
                </StyledText>
              </p>
              <p>
                <Text size="large" weight="bold" color="#333333">
                  Oh no, something went wrong
                </Text>
              </p>
              <p>
                <StyledText size="medium">
                  Sorry! We encountered an error while loading this page. Please
                  try again.
                </StyledText>
              </p>
            </div>
            <DivForButton>
              <ErrorButton text="Reload page" height="3rem" width="20.5rem" />
            </DivForButton>
          </ErrorInfoAndLinks>
        </ErrorContainer>
      </Layout>
    )
  }
}

export default Error500
