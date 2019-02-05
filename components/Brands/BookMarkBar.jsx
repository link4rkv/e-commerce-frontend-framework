import React, { Component } from 'react'
import styled from 'styled-components'
import Text from '../Text/Text'
import { visible, from } from '../../lib/Media'
import { ALPHABETS } from '../../pages/brands/index'

const BookMarkBarContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${from('desktop')} {
    flex-direction: row;
  }
`

const StyledLink = styled.a`
  display: flex;
  text-decoration: none;
  color: #1557bf;
  padding: 0 0.15rem;
  ${from('desktop')} {
    padding: 0 0.35rem;
  }
`

const StyledDiv = styled.div`
  display: flex;
  text-decoration: none;
  color: #696969;
  cursor: not-allowed;
  padding: 0 0.15rem;
  ${from('desktop')} {
    padding: 0 0.35rem;
  }
`

const StyledTextForMobileAndTab = styled(Text)`
  ${from('desktop')} {
    display: none;
  }
`
const StyledTextForPC = styled(Text)`
  ${visible(from('desktop'))}
`
class BookMarkBar extends Component {
  render() {
    const dataForBrands = this.props.data
    return (
      <BookMarkBarContainer data-testid="bookmarkbar">
        {ALPHABETS.map(e => {
          return dataForBrands[e] && dataForBrands[e].length ? (
            <StyledLink href={`#${e}`} key={e}>
              <StyledTextForMobileAndTab size="small" weight="black">
                {e}
              </StyledTextForMobileAndTab>
              <StyledTextForPC size="medium" weight="bold">
                {e}
              </StyledTextForPC>
            </StyledLink>
          ) : (
            <StyledDiv key={e}>
              <StyledTextForMobileAndTab size="small" weight="black">
                {e}
              </StyledTextForMobileAndTab>
              <StyledTextForPC size="medium" weight="bold">
                {e}
              </StyledTextForPC>
            </StyledDiv>
          )
        })}
      </BookMarkBarContainer>
    )
  }
}

export default BookMarkBar
