import React, { Component } from 'react'
import styled from 'styled-components'
import { InlineBlock, Button, Popover } from 'reakit'
import Expand from '../icons/Expand'
import Star from '../icons/Star'
import Text from '../Text/Text'
import { only, from } from '../../lib/Media'

const PlainContainer = styled.div`
  width: 100%;
  max-width: 14.5rem;
  height: 3.5rem;
  justify-content: space-between;
  background-color: #ffffff;
  align-items: center;
  ${from('tablet')} {
    max-width: 13.75rem;
  }
  ${from('desktop')} {
    width: 15.5rem;
    max-width: unset;
  }
`
const SortContainer = styled(PlainContainer)`
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`
const Heading = styled.p`
  letter-spacing: 0.0625rem;
  color: #696969;
`
const SelectedFilter = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const StyledPopover = styled(Popover)`
  display: flex;
  width: 100%;
  background-color: white;
  box-shadow: 0 0.8125rem 0.9375rem 0 rgba(0, 0, 0, 0.12);
  ${from('desktop')} {
    margin-left: -0.4rem;
  }
`
const StyledButton = styled(Button)`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: left;

  /* IE11 */
  border: none;
  background: none;
  /* end IE11 */

  :focus {
    outline: none;
  }
`

const ListContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0.5rem 0.1rem;
  ${only('mobile')} {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`

const Anchor = styled.div`
  display: flex;
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: #1557bf;
  :hover {
    cursor: pointer;
    font-weight: bold;
  }
`
const CheckBoxDiv = styled.div`
  height: 1rem;
  width: 1rem;
  margin-right: 0.375rem;
`

const ButtonFullWidth = styled(Button)`
  width: 100%;

  /* IE11 */
  border: none;
  background: none;
  /* end IE11 */

  :focus {
    outline: none;
  }
`

class Sort extends Component {
  constructor() {
    super()
    this.state = {
      SelectedFilter: 'Relevancy',
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(param) {
    this.setState({
      SelectedFilter: param,
    })
  }
  render() {
    return (
      <PlainContainer>
        <Popover.Container>
          {popover => (
            <InlineBlock relative width="100%">
              <ButtonFullWidth as={Popover.Toggle} {...popover}>
                <SortContainer>
                  <Block>
                    <Heading>
                      <Text size="small" weight="black">
                        SORT BY
                      </Text>
                    </Heading>
                    <SelectedFilter>
                      <Text size="medium">{this.state.SelectedFilter}</Text>
                    </SelectedFilter>
                  </Block>
                  <Block>
                    <Expand />
                  </Block>
                </SortContainer>
              </ButtonFullWidth>
              <StyledPopover
                fade
                slide
                expand
                hideOnClickOutside
                {...popover}
                gutter={4}
              >
                <StyledButton as={Popover.Toggle} {...popover}>
                  <ListContainer>
                    {this.props.data.map(e => (
                      <Anchor
                        key={e}
                        vlaue={e}
                        onClick={this.handleClick.bind(this, e)}
                      >
                        <CheckBoxDiv>
                          {this.state.SelectedFilter === e ? <Star /> : ' '}
                        </CheckBoxDiv>
                        <Text size="medium">{e}</Text>
                      </Anchor>
                    ))}
                  </ListContainer>
                </StyledButton>
              </StyledPopover>
            </InlineBlock>
          )}
        </Popover.Container>
      </PlainContainer>
    )
  }
}

export default Sort
