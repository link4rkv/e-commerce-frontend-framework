import React from 'react'
import styled from 'styled-components'

const StyledSlideArrow = styled.div`
  cursor: pointer;
  font-size: 2rem;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  border-radius: 50%;
  background-color: #ffffff;
  justify-content: center;
  opacity: 0.8;
  border: 1px solid #eaeaea;

  ${props => (props.direction === 'left' ? `left: 1rem;` : `right: 1rem;`)};

  > i {
    border: solid #0d3578;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: ${props =>
      props.direction === 'left' ? 'rotate(135deg)' : 'rotate(-45deg)'};
  }
`

const Arrow = ({ direction, onClick }) => (
  <StyledSlideArrow direction={direction} onClick={onClick} data-testid="arrow">
    <i />
  </StyledSlideArrow>
)

export default Arrow
