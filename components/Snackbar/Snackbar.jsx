import React from 'react'
import styled, { keyframes } from 'styled-components'
import Text from '../Text'
import Remove from '../icons/Remove'
import { from } from '../../lib/Media'

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 1rem);
  }

  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }

`

const StyledSnackbar = styled.div`
  position: fixed;
  border-radius: 4px;
  box-shadow: 0 13px 15px 0 rgba(0, 0, 0, 0.12);
  background-color: #0b8043;
  padding: 1rem;
  max-width: calc(100% - 2rem);
  width: 100%;
  bottom: ${props => props.bottom || '1rem'};
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${slideUp} 0.3s linear;

  ${from('tablet')} {
    max-width: 29rem;
  }
`

const RemoveButton = styled(Remove)`
  height: 1rem;
  width: 1rem;
  margin-left: 0.5rem;
  fill: #f2f5f6;
`

const Snackbar = ({ message, bottom, className, onClick }) => (
  <StyledSnackbar className={className} bottom={bottom}>
    <Text size="medium" color="#ffffff" weight="bold" data-testid="message">
      {message}
    </Text>
    <RemoveButton onClick={onClick} data-testid="closeSnackbar" />
  </StyledSnackbar>
)

export default Snackbar
