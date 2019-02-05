import React, { Component } from 'react'
import styled from 'styled-components'
import CheckboxSelected from '../icons/CheckboxSelected'
import CheckboxUnselected from '../icons/CheckboxUnselected'
import Text from '../Text/Text'

let Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem 1rem 0;
`
const StyledImage = styled.div`
  padding: 0 0.5rem 0 1rem;
  transform: translateY(6%);
`

const Div = styled.div`
  display: flex;
`

class FilterList extends Component {
  render() {
    return (
      <Container data-testid="container">
        {this.props.data.map((e, index) => {
          return (
            <Div
              key={e.label}
              data-testid={`checkbox-${index}`}
              onClick={event => this.props.onClick(event, e)}
            >
              <StyledImage>
                {e.checked ? (
                  <CheckboxSelected
                    data-testid={`checked-svg-${index}`}
                    height="24"
                    width="24"
                  />
                ) : (
                  <CheckboxUnselected
                    data-testid={`unchecked-svg-${index}`}
                    height="24"
                    width="24"
                  />
                )}
              </StyledImage>
              <Text size="medium">{e.label}</Text>
            </Div>
          )
        })}
      </Container>
    )
  }
}

export default FilterList
