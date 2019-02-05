import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: #1557bf;
  border: 0;
  color: white;
  border-radius: ${props => (props.type === 'capsule' ? '2rem' : '0.75rem')};
  font-family: Lato, sans-serif;
  outline: none;
`

class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { className, children, onClick, type } = this.props
    return (
      <StyledButton className={className} onClick={onClick} type={type}>
        {children}
      </StyledButton>
    )
  }
}

Button.defaultProps = {
  onClick: () => {},
}

export default Button
