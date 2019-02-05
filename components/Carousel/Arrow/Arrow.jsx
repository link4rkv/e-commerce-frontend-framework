import React from 'react'
import styled from 'styled-components'
import { from } from '../../../lib/Media'
const StyledSlideArrow = styled.div`
  cursor: pointer;
  font-size: 2rem;
  display: flex;
  align-items: center;
  border-radius: 50%;
  background-color: #ffffff;
  justify-content: center;
  opacity: 0.8;
  border: 1px solid #eaeaea;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);

  ${from('desktop')} {
    width: 2.5rem;
    height: 2.5rem;
  }

  > i {
    border: solid #0d3578;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;

    ${props =>
      props.direction === 'left'
        ? `
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
    `
        : `
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    `}
  }
`

const Arrow = ({ direction, clickFunction }) => (
  <StyledSlideArrow
    direction={direction}
    onClick={clickFunction}
    data-testid="arrow"
  >
    <i direction={direction} />
  </StyledSlideArrow>
)

export default Arrow
