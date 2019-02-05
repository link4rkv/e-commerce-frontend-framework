import React from 'react'
import styled from 'styled-components'

// CONSTANT
const ESC_KEY = 27

const StyledPopup = styled.div`
  background-color: ${props => props.bgColor || '#333333cc'};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  overflow: auto;
  outline: none;
`

class Popup extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    this.modalRef && this.modalRef.focus()
  }

  componentDidUpdate() {
    this.modalRef && this.modalRef.focus()
  }

  handleKeyDown(event) {
    // Check if ESC key is pressed
    if (event.which === ESC_KEY && typeof this.props.onClose === 'function') {
      this.props.onClose()
    }
  }

  handleClick(event) {
    event.stopPropagation()
    // Check if the target is modal-backdrop
    if (
      this.modalRef === event.target &&
      typeof this.props.onClose === 'function'
    ) {
      this.props.onClose()
    }
  }

  render() {
    const { children, bgColor, className } = this.props
    return (
      <StyledPopup
        className={className}
        ref={node => {
          this.modalRef = node
        }}
        bgColor={bgColor}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClick}
        data-testid="popup"
        tabIndex="0"
      >
        {children}
      </StyledPopup>
    )
  }
}

export default Popup
