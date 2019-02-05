import React from 'react'
import styled from 'styled-components'

const StyledDel = styled.del`
  color: #9b9b9b;
`

class Price extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { amount, discount, forceDigits, outdated } = this.props

    const hasDiscount = discount > 0
    const currentAmount = hasDiscount ? amount - discount : amount

    const formattedPrice =
      currentAmount === 0 && !forceDigits
        ? 'Free'
        : `$${new Intl.NumberFormat('en-SG', {
            useGrouping: false,
            style: 'decimal',
            minimumFractionDigits: 2,
          }).format(Math.abs(currentAmount))}`

    const isNegative = currentAmount < 0
    const RenderAsElement = outdated ? StyledDel : 'span'

    return (
      <RenderAsElement>
        {isNegative && '-'}
        {formattedPrice}
      </RenderAsElement>
    )
  }
}

Price.defaultProps = {}

export default Price
