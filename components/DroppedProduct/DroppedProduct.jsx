import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import isEmpty from 'lodash/isEmpty'

import Price from './../Price'
import Text from './../Text'
import Image from './../Image'

import NoImg from '../icons/NoImg'

const StyledContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eaeaea;
  background-color: white;
  min-height: 7rem;
  margin-bottom: 0.5rem;
`

const StyledText = styled(Text)`
  margin-right: 2rem;
`

const StyledInfo = styled.div`
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  justify-content: space-between;
`

const StyledA = styled.a`
  text-decoration: none;
  color: currentColor;
`

const StyledCartCounter = styled.span`
  background-color: #eaeaea;
  padding: 4px;
  border-radius: 2px;
`
const StyledDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.6rem;
  align-items: center;
`
const StyledNoImageIcon = styled(NoImg)`
  width: 5rem;
  height: 5rem;
  display: inline-block;
  padding: 0.5rem;
`

const StyledPriceText = styled(Text)`
  padding: 4px;
`

const DroppedProduct = props => {
  const { details, itemCount } = props
  if (isEmpty(details)) {
    return null
  }
  const { name, description, images } = details
  const price =
    details.storeSpecificData &&
    details.storeSpecificData[0] &&
    details.storeSpecificData[0].mrp

  return (
    <Link href="product" passHref>
      <StyledA>
        <StyledContainer data-testid="compact-product">
          {images && images.length > 0 ? (
            <Image
              alt={description || 'product-image'}
              src={images[0]}
              width="72"
              height="72"
            />
          ) : (
            <StyledNoImageIcon />
          )}

          <StyledInfo>
            <StyledText size="medium" weight="regular" color="#333333">
              {name}
            </StyledText>
            <StyledDetail>
              <StyledCartCounter>
                <Text size="medium" weight="bold" color="#696969">
                  {itemCount}
                </Text>
              </StyledCartCounter>
              <StyledPriceText size="large" weight="black" color="#333333">
                <Price amount={price} />
              </StyledPriceText>
            </StyledDetail>
          </StyledInfo>
        </StyledContainer>
      </StyledA>
    </Link>
  )
}

export default DroppedProduct
