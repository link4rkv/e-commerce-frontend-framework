import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.span`
  display: inline-flex;
  align-items: center;
`

class TextIcon extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { prefix, suffix, children, className } = this.props

    return (
      <StyledContainer className={className}>
        {prefix}
        {children}
        {suffix}
      </StyledContainer>
    )
  }
}

TextIcon.defaultProps = {}

export default TextIcon
