import styled, { keyframes } from 'styled-components'

const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`

const Loader = styled.div`
  border-radius: 50%;
  width: 1.875rem;
  height: 1.875rem;
  margin: 3.125rem auto;
  border: 0.25rem solid #ccc;
  border-top-color: blue;
  animation: ${spin} 500ms infinite linear;
`

export default Loader
