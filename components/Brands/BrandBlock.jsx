import React, { Component } from 'react'
import styled from 'styled-components'
import { from } from '../../lib/Media'
import Text from '../Text/Text'
import Link from 'next/link'

const BrandBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background-color: #ffffff;
`
const Heading = styled.div`
  display: block;
  margin: 1rem 0 0 1rem;
`
const BrandLinkContainer = styled.div`
  padding-left: 1rem;
  display: flex;
  flex-wrap: wrap;
  > ul {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
  }
`

const BrandLinkStyle = styled.div`
  display: flex;
  text-decoration: none;
  color: #1557bf;
  margin: 1rem 0 1rem 1rem;
  width: 100%;
  ${from('tablet')} {
    width: 45%;
  }
  ${from('hd')} {
    width: 23%;
  }
  > span {
    text-transform: capitalize;
  }
`
const StyledText = styled(Text)`
  cursor: pointer;
`

class BrandBlock extends Component {
  render() {
    return (
      <BrandBlockContainer
        id={this.props.alphabet}
        data-testid={this.props.alphabet}
      >
        <Heading>
          <Text size="medium" weight="bold">
            {this.props.alphabet}
          </Text>
        </Heading>
        <BrandLinkContainer>
          <ul>
            {this.props.data.map((ele, index) => {
              let name = ele.name.toLowerCase()
              return (
                <Link
                  href={`/brand/${ele.slug}`}
                  passHref
                  key={ele.slug + index}
                >
                  <BrandLinkStyle>
                    <StyledText size="medium">{name}</StyledText>
                  </BrandLinkStyle>
                </Link>
              )
            })}
          </ul>
        </BrandLinkContainer>
      </BrandBlockContainer>
    )
  }
}

export default BrandBlock
