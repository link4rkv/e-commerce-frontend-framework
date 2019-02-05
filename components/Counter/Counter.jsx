import React from 'react'
import styled from 'styled-components'

import Text from './../Text'

const ActionButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #1557bf;
  border-radius: 50%;
  border: none;
  color: white;
  cursor: pointer;
`

export const CounterText = styled.div`
  background-color: #f3f5f7;
  color: #1557bf;

  border: 1px solid #eaeaea;
  border-radius: 2px;

  margin: 0.25rem 0.5rem;

  display: flex;
  flex: 1;

  justify-content: center;
  align-items: center;

  min-width: 1.25rem;

  padding: 4px;
`

const Container = styled.div`
  display: flex;
  flex: 1;
`

const StyledText = styled(Text)`
  vertical-align: middle;
  line-height: 2.55rem;
`

class Counter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.defaultValue,
    }

    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.props.onChange({
        prevValue: prevState.value,
        nextValue: this.state.value,
        delta: this.state.value - prevState.value,
      })
    }
  }

  handleDecrement(event) {
    event.preventDefault()
    this.setState(({ value }) => ({
      value: value === 0 ? 0 : value - 1,
    }))
  }

  handleIncrement(event) {
    event.preventDefault()
    this.setState(prevState => ({
      value: prevState.value + 1,
    }))
  }

  render() {
    return (
      <Container>
        <ActionButton onClick={this.handleDecrement}>
          <Text size="xxl">-</Text>
        </ActionButton>
        <CounterText data-testid="counter-value">
          <Text size="large" weight="bold">
            {this.state.value}
          </Text>
        </CounterText>
        <ActionButton onClick={this.handleIncrement}>
          <StyledText size="xxl">+</StyledText>
        </ActionButton>
      </Container>
    )
  }
}

Counter.defaultProps = {
  defaultValue: 0,
  onChange: () => {},
}

export default Counter
