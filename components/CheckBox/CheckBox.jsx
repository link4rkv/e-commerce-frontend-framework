import React, { Component } from 'react'
import styled from 'styled-components'
import Text from '../Text'
import CheckboxSelected from '../icons/CheckboxSelected'
import CheckboxUnselected from '../icons/CheckboxUnselected'

const CheckboxInput = styled.input`
  display: none;
`
const Label = styled.label`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`

class Checkbox extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onChange && this.props.onChange(e.target.value)
  }

  render() {
    const { name, value, inlineLabel, checked } = this.props
    return (
      <span>
        <CheckboxInput
          type="checkbox"
          name={name}
          value={value}
          id={name}
          onChange={this.handleChange}
          checked={checked}
        />
        <Label htmlFor={name}>
          <Text>{inlineLabel}</Text>
          {checked ? (
            <CheckboxSelected height="24" width="24" />
          ) : (
            <CheckboxUnselected height="24" width="24" />
          )}
        </Label>
      </span>
    )
  }
}

export default Checkbox
