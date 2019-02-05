import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'
import Text from '../Text/Text'
import { from, only } from '../../lib/Media'

const FullWidthButton = styled(Button)`
  cursor: pointer;
  text-align: center;
  color: #fff;
  ${only('mobile')} {
    height: 3rem;
    width: 100%;
    max-width: 20.5rem;
  }
  ${from('tablet')} {
    height: 2.25rem;
    padding: 0.35rem 1.65rem;
  }
`
const TextForMobile = styled(Text)`
  ${from('tablet')} {
    display: none;
  }
`

const TextFromTablet = styled(Text)`
  display: none;
  ${from('tablet')} {
    display: initial;
  }
`

class ErrorButton extends Component {
  render() {
    return (
      <FullWidthButton type="capsule">
        <TextForMobile size="large" weight="bold">
          {this.props.text}
        </TextForMobile>
        <TextFromTablet size="medium" weight="bold">
          {this.props.text}
        </TextFromTablet>
      </FullWidthButton>
    )
  }
}

export default ErrorButton
