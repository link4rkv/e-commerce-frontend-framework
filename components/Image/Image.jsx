import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
`

const StyledImg = styled.img`
  display: inline-block;
  margin-top: 1px;
  border-radius: ${props => (props.round ? '50%' : 0)};
  margin-bottom: ${props => (props.caption ? '0.5rem' : 0)};
`

class Image extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { round, caption, src, width, height, ...imgAttributes } = this.props

    return (
      <StyledContainer>
        {/* It is okay to do spread here because it should support all Image
        attributes. */}
        <StyledImg
          {...imgAttributes}
          width={width}
          height={height}
          src={src}
          round={round}
          caption={caption}
        />
        {caption}
      </StyledContainer>
    )
  }
}

Image.defaultProps = {}

export default Image
