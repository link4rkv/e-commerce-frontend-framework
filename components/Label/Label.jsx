import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.span`
  border-radius: 0.5rem;
  padding: 0.1rem 0.5rem;
  color: #515151;
  background-color: #d8d8d8;

  display: flex;
  align-items: flex-start;
`

const StyledClose = styled.button`
  font-size: 1rem;
`

class Label extends React.Component {
  render() {
    const { onClose } = this.props

    return (
      <StyledContainer>
        <span>{this.props.text}</span>
        {onClose && (
          <StyledClose data-testid="close" onClick={() => onClose()}>
            X
          </StyledClose>
        )}
      </StyledContainer>
    )
  }
}

Label.defaultProps = {}

export default Label
