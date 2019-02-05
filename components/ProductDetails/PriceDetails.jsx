import React, { Component } from 'react'
import styled from 'styled-components'
import Text from '../Text/Text'
import { from } from '../../lib/Media'

const PriceDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  > div:not(:last-child) {
    margin-bottom: 0.3rem;
  }
  ${from('tablet')} {
    > div:not(:last-child) {
      margin-bottom: 0.75rem;
    }
  }
`

const PriceAndDiscount = styled.div`
  display: flex;
`

const Heading = styled.span`
  margin-right: 0.8rem;
  color: #333333;
`

const SubHeading = styled.div`
  display: flex;
  text-decoration: line-through;
  justify-content: center;
  align-items: center;
  color: #696969;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const ProductInfoSubHeading = styled.span`
  margin-top: 1rem;
`

class PriceDetails extends Component {
  constructor() {
    super()
  }
  render() {
    const data = this.props && this.props.data && this.props.data[0]
    const { name, subName } = this.props
    let { mrp, discount } = 0
    if (data) {
      mrp = data.mrp
      discount = data.discount
    }
    mrp = Number(mrp || 0)
    discount = Number(discount || 0)
    const currency = data && data.currency && data.currency.symbol
    return (
      <PriceDetailsContainer>
        <PriceAndDiscount>
          <Heading>
            <Text size="xxl" weight="black">{`${currency || ''}${(
              mrp - discount
            ).toFixed(2)}`}</Text>
          </Heading>
          {discount ? (
            <SubHeading>
              <Text size="small">{`${currency || ''}${mrp.toFixed(2)}`}</Text>
            </SubHeading>
          ) : null}
        </PriceAndDiscount>
        <ProductInfo>
          <Heading>
            <Text size="xl" weight="bold">
              {name}
            </Text>
          </Heading>
          {subName && (
            <ProductInfoSubHeading>
              <Text size="small">{subName}</Text>
            </ProductInfoSubHeading>
          )}
        </ProductInfo>
      </PriceDetailsContainer>
    )
  }
}

export default PriceDetails
