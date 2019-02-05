import styled from 'styled-components'

const WEIGHTS = {
  regular: 500,
  bold: 700,
  black: 900,
}

const SIZES = {
  small: { 'font-size': 0.75, 'line-height': 1 }, // 12
  medium: { 'font-size': 0.875, 'line-height': 1.25 }, // 14
  large: { 'font-size': 1, 'line-height': 1.5 }, // 16
  xl: { 'font-size': 1.125, 'line-height': 1.5 }, // 18
  xxl: { 'font-size': 1.6 }, // 26
}
export default styled.span`
  text-align: ${({ align }) => align};
  font-weight: ${({ weight }) => WEIGHTS[weight]};
  color: ${({ color }) => color};

  text-transform: ${({ caps }) => caps && 'uppercase'};

  font-size: ${({ size = 'medium' }) => SIZES[size]['font-size']}rem;
  line-height: ${({ size = 'medium' }) => SIZES[size]['line-height']}rem;
`
