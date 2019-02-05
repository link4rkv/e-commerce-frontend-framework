import React, { Component } from 'react'
import styled from 'styled-components'
import { from, only } from '../../lib/Media'
import BrandBlock from './BrandBlock'
import { ALPHABETS } from '../../pages/brands/index'

let BrandsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  ${only('mobile')} {
    > div:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
  ${from('tablet')} {
    margin-top: 1rem;
    > div:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`

class Brands extends Component {
  render() {
    const dataForBrands = this.props.data
    return (
      <BrandsContainer data-testid={'brands'}>
        {ALPHABETS.map(el => {
          return dataForBrands[el] && dataForBrands[el].length ? (
            <BrandBlock key={el} data={dataForBrands[el]} alphabet={el} />
          ) : null
        })}
      </BrandsContainer>
    )
  }
}

export default Brands
