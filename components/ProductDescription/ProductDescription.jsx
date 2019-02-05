import React, { Component } from 'react'
import styled from 'styled-components'
import Text from '../Text/Text'

const Description = styled.div`
  margin: ${props => props.margin || '1rem'};
  padding: ${props => props.padding || '1.5rem'};
  background-color: white;
`

const Heading = styled.h1`
  letter-spacing: 0.0625rem;
  color: #696969;
  margin-bottom: 0.5rem;
`

const DescriptionList = styled.ul`
  list-style-position: inside;
`

const DescriptionListItem = styled.li`
  color: #333333;
`

class ProductDescription extends Component {
  render() {
    let { title, data } = this.props
    data = Array.isArray(data) ? data : data.split('\n')
    return (
      <Description padding={this.props.padding} margin={this.props.margin}>
        {title && (
          <Heading title={title}>
            <Text size="small" weight="black">
              {title}
            </Text>
          </Heading>
        )}
        {data && (
          <DescriptionList>
            {data.map(element => (
              <DescriptionListItem key={element}>
                <Text size="medium">{element}</Text>
              </DescriptionListItem>
            ))}
          </DescriptionList>
        )}
      </Description>
    )
  }
}

export default ProductDescription
