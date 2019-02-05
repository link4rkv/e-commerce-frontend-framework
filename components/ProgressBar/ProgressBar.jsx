import React from 'react'
import styled from 'styled-components'

const ProgressBar = ({
  steps = 0,
  currentPos = 0,
  height,
  color,
  className,
}) => {
  let Bar = styled.div`
    height: ${height ? height : '0.5rem'};
    width: ${Math.round((currentPos / steps) * 100)}%;
    background-color: ${color ? color : '#5cc151'};
    transition: width 1s;
  `

  return <Bar className={className} data-testid="progress-bar" />
}

export default ProgressBar
