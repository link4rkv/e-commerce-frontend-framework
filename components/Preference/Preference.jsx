import React, { Component } from 'react'
import styled from 'styled-components'
import Text from '../Text'
import CheckBox from '../CheckBox/CheckBox'
import { from } from '../../lib/Media'

const DietOptions = [
  'Halal',
  'Organic',
  'Gluten-free',
  'Hypollergenic',
  'Trans-fat-free',
  'Lactose free',
  'Healthier choice',
  'Vegetarian',
]
const StyledContainer = styled.div`
  max-width: 19.5rem;
  width: 100%;
  margin-top: 1.75rem;

  ${from('tablet')} {
    max-width: unset;
    width: 43rem;
  }
`
const SubTitle = styled.div`
  max-width: 80%;
`
const CheckBoxContainer = styled.div`
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;

  ${from('tablet')} {
    flex-direction: row;
  }
`
const CheckBoxWrapper = styled.div`
  border-top: 1px solid #eaeaea;
  padding: 0.625rem;
`

const DietaryGroup = styled.div`
  display: inline-block;
  width: 100%;

  ${from('tablet')} {
    width: calc((100% - 2rem) / 2);
  }

  :first-child {
    margin-right: 2rem;
  }
`

class Preference extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState(prevState => {
      let newState = { ...prevState }
      let index = newState.selected.indexOf(value)

      newState.selected = [...prevState.selected]
      if (index > -1) {
        newState.selected.splice(index, 1)
      } else {
        newState.selected.push(value)
      }

      return newState
    })
  }

  render() {
    let mid = parseInt(DietOptions.length / 2, 10)
    let group1 = DietOptions.slice(0, mid)
    let group2 = DietOptions.slice(mid, DietOptions.length)
    let { selected } = this.state
    return (
      <StyledContainer>
        <div>
          <Text size="large" weight="bold" color="#333333">
            Dietary preferences
          </Text>
        </div>
        <SubTitle>
          <Text color="#333333">
            Select your dietary preferences and we will prioritise the products
            listed
          </Text>
        </SubTitle>
        <CheckBoxContainer>
          <DietaryGroup>
            {group1.map(option => (
              <CheckBoxWrapper
                key={option
                  .split(' ')
                  .join('-')
                  .toLowerCase()}
              >
                <CheckBox
                  inlineLabel={option}
                  name={option
                    .split(' ')
                    .join('-')
                    .toLowerCase()}
                  value={option}
                  onChange={this.handleChange}
                  checked={selected.includes(option)}
                />
              </CheckBoxWrapper>
            ))}
          </DietaryGroup>
          <DietaryGroup>
            {group2.map(option => (
              <CheckBoxWrapper
                key={option
                  .split(' ')
                  .join('-')
                  .toLowerCase()}
              >
                <CheckBox
                  inlineLabel={option}
                  name={option
                    .split(' ')
                    .join('-')
                    .toLowerCase()}
                  value={option}
                  onChange={this.handleChange}
                  checked={selected.includes(option)}
                />
              </CheckBoxWrapper>
            ))}
          </DietaryGroup>
        </CheckBoxContainer>
      </StyledContainer>
    )
  }
}

export default Preference
