import React, { Component } from 'react'
import styled from 'styled-components'
import RemoveIcon from '../icons/Remove'
import Text from '../Text'

const Container = styled.div`
  position: relative;
  margin: 0.6rem 0;
`

const Label = styled.label`
  color: #1557bf;
  font-size: 1rem;
  font-weight: 600;
  position: absolute;
  pointer-events: none;
  left: 1rem;
  top: 1.1rem;
  transition: 0.2s ease all;
`

const InputBox = styled.input`
  font-size: 1rem;
  padding: 1.5rem 1.5rem 0.7rem 1rem;
  font-family: Lato, sans-serif;
  display: block;
  width: 100%;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  :focus {
    outline: none;
    border-color: #1557bf;
    color: ${({ variant }) => (variant === 'default' ? '#333333' : '#1557bf')};
  }
  :valid {
    outline: none;
    color: ${({ variant }) => (variant === 'default' ? '#333333' : '#1557bf')};
  }
  :focus
    ~ ${/* sc-selector */ Label},
    :not([value=''])
    ~ ${/* sc-selector */ Label} {
    top: 0.35rem;
    font-size: 0.75rem;
    color: ${({ variant, invalid }) =>
      invalid ? '#dd0d42' : variant === 'default' ? '#1557bf' : '#333333'};
  }
`

const ErrorText = styled(Text)`
  position: absolute;
  left: 0;
  font-weight: normal;
`

const ClearIcon = styled(RemoveIcon)`
  position: absolute;
  right: 0.7rem;
  top: 1.6rem;
  cursor: pointer;
`

const StyledRadioInput = styled.input`
  display: none;
  :checked + label::before {
    background-color: ${({ color }) => (color ? color : '#0d3578')};
  }
`

const StyledRadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  &::before {
    content: '';
    display: inline-block;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    border: 1px solid #1557bf;
    margin-right: 0.56rem;
  }
`

const ShowButton = styled(Text)`
  position: absolute;
  right: 0.7rem;
  top: 1.2rem;
  cursor: pointer;
`

const Radio = ({ label, checked, name, id, value, onChange, color }) => (
  <React.Fragment>
    <StyledRadioInput
      type="radio"
      name={name}
      id={id}
      checked={checked}
      value={value}
      onChange={onChange}
      color={color}
    />
    <StyledRadioLabel htmlFor={id}>
      <Text size="medium" weight="bold" color="#333333">
        {label}
      </Text>
    </StyledRadioLabel>
  </React.Fragment>
)

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleTogglePassword = this.handleTogglePassword.bind(this)
  }
  handleTogglePassword() {
    if (!this.state.stateType) {
      this.setState({ stateType: 'text' })
    } else {
      this.setState({
        stateType: this.state.stateType === 'password' ? 'text' : 'password',
      })
    }
  }
  render() {
    let {
      label,
      clear,
      value,
      id,
      name,
      type,
      variant,
      required,
      invalid,
      autoFocus,
      className,
      hideToggleButton,
      ...events
    } = this.props
    let { onChange, onKeyDown, onKeyUp } = events
    let { stateType } = this.state
    return (
      <Container className={className}>
        <InputBox
          onChange={onChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          name={name}
          type={stateType || type}
          value={value || ''}
          id={id}
          autoComplete="off"
          variant={variant}
          required={required}
          invalid={Boolean(invalid)}
          data-testid="input"
          autoFocus={autoFocus}
          className={className}
        />
        <Label data-testid="input-label" htmlFor={id || ''}>
          {label}
        </Label>
        {value && clear && (
          <ClearIcon onClick={clear} data-testid="remove-icon" />
        )}
        {!hideToggleButton && value && type === 'password' && (
          <ShowButton
            weight="bold"
            color="#1557bf"
            onClick={this.handleTogglePassword}
          >
            {stateType === 'text' ? 'Hide' : 'Show'}
          </ShowButton>
        )}
        {Boolean(invalid) && (
          <ErrorText size="small" weight="bold" color="#dd0d42">
            {invalid}
          </ErrorText>
        )}
      </Container>
    )
  }
}

Input.defaultProps = {
  variant: 'default',
}

export default Input

export { Radio }
