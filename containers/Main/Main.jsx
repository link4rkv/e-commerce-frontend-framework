import React from 'react'
import styled from 'styled-components'
import { from } from './../../lib/Media'

const WrpDiv = styled.div`
  margin: 0 auto;
  padding: 1rem 0.5rem;

  ${from('tablet')} {
    padding: 1.5rem 2rem;
  }

  ${from('desktop')} {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  ${from('hd')} {
    padding-left: 4.8rem;
    padding-right: 3.5rem;
  }

  ${from('uhd')} {
    padding-left: 3.5rem;
  }
`

const DivTablet = styled(WrpDiv)`
  ${from('tablet')} {
    padding: 0rem;
    margin: 0rem;
    max-width: unset;
  }
`
const DivPc = styled(WrpDiv)`
  ${from('desktop')} {
    padding: 0rem;
    margin: 0rem;
    max-width: unset;
  }
`

const DivHd = styled(WrpDiv)`
  ${from('hd')} {
    padding: 0rem;
    margin: 0rem;
    max-width: unset;
  }
`

const Main = ({ children, noWrapper = 'default' }) => (
  <main>
    {noWrapper === 'fromMobile' && <div>{children}</div>}
    {noWrapper === 'fromTablet' && <DivTablet>{children}</DivTablet>}
    {noWrapper === 'fromDesktop' && <DivPc>{children}</DivPc>}
    {noWrapper === 'fromHd' && <DivHd>{children}</DivHd>}
    {noWrapper === 'default' && <WrpDiv>{children}</WrpDiv>}
  </main>
)

export default Main

export { WrpDiv }
