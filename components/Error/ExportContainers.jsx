import styled from 'styled-components'
import { only, from } from '../../lib/Media'
import Text from '../Text/Text'

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  ${from('tablet')} {
    flex-direction: row;
    > div {
      width: 50%;
    }
  }
`

export const ErrorInfoAndLinks = styled.div`
  display: flex;
  flex-direction: column;
  ${only('mobile')} {
    text-align: center;
    margin: 1rem 1rem 2rem 1rem;
    margin-top: ${props => props.marginTop || '1rem'};
  }
  ${from('tablet')} {
    padding: 2rem 0 0 2rem;
  }
  ${from('desktop')} {
    padding: 2.5rem 0 0 2.5rem;
  }
  ${from('hd')} {
    padding: 2.5rem 0 0 5.6875rem;
  }
  ${from('uhd')} {
    padding: 2.5rem 0 0 3.5rem;
  }
  > div > :first-child {
    margin-bottom: ${props => props.marginBelowHeading || '0.25rem'};
  }
`

export const LinksDiv = styled.div`
  > p:not(:last-child) {
    margin-bottom: 1rem;
  }
  ${only('mobile')} {
    text-align: center;
  }
  margin-top: ${props => props.marginTop || '1.5rem'};
`

export const ImgDiv = styled.div`
  ${from('tablet')} {
    order: 2;
  }
`
export const StyledText = styled(Text)`
  color: #696969;
  letter-spacing: ${props => props.letterSpacing || 'normal'};
`

export const LinkText = styled(Text)`
  cursor: pointer;
  color: #1557bf;
`

export const DivForButton = styled.div`
  > p:not(:last-child) {
    margin-bottom: 1rem;
  }
  ${only('mobile')} {
    text-align: center;
    margin-top: 2.5rem;
  }
  ${from('tablet')} {
    margin-top: ${props => props.marginTop || '0.75rem'};
  }
`
