import React, { Component } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import moment from 'moment'
import Text from '../Text'
import { Radio } from '../Input'
import CheckoutHeader from '../CheckoutHeader'

import { from } from '../../lib/Media'

const Container = styled.div`
  padding: 1rem;
  background-color: ${({ expanded }) => (expanded ? '#f3f5f7' : '#ffffff')};
  margin-bottom: 0.5rem;
  max-height: ${({ expanded }) => (expanded ? '100vh' : '6.25rem')};
  overflow: ${({ expanded }) => (expanded ? 'auto' : 'hidden')};
  opacity: ${({ expanded, valid }) => (expanded || valid ? '1' : '0.5')};
  position: ${({ expanded }) => (expanded ? 'fixed' : 'static')};
  z-index: ${({ expanded }) => (expanded ? '1' : '0')};
  pointer-events: ${({ expanded, valid }) =>
    expanded || valid ? 'all' : 'none'};
  top: 0;
  width: 100%;
  left: 0;
  transition: max-height 0.4s ease-in-out;
`
const Heading = styled.h3`
  font-weight: bold;
  color: #1557bf;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span:first-child {
    color: #333333;
  }
`

const StyledForm = styled.form`
  margin-top: 4.5rem;
  margin-bottom: 6.5rem;
  outline: none;

  ${from('tablet')} {
    max-width: 44rem;
    margin-left: auto;
    margin-right: auto;

    > ul {
      display: inline-block;
      width: calc((100% - 1rem) / 2);
    }

    > ul:nth-child(odd) {
      margin-right: 1rem;
    }
  }

  ${from('desktop')} {
    max-width: 100%;
    padding: 0 1rem;
    > ul {
      width: calc((100% - 2rem) / 3);
    }

    > ul:not(:nth-child(3n)) {
      margin-right: 1rem;
    }

    > ul:nth-child(3n) {
      margin-right: 0;
    }
  }

  ${from('hd')} {
    padding: 0 2.5rem;
  }

  ${from('uhd')} {
    max-width: 96rem;
    > ul {
      width: calc((100% - 3rem) / 4);
    }

    > ul:not(:nth-child(4n)) {
      margin-right: 1rem;
    }

    > ul:nth-child(4n) {
      margin-right: 0;
    }
  }
`

const StyledUl = styled.ul`
  margin-bottom: 1.5rem;
  vertical-align: top;
`
const StyledLi = styled.li`
  background-color: ${({ available }) => (available ? '#ffffff' : '#eaeaea')};
  padding: ${({ available }) => (available ? '1rem' : '1rem 1rem 1rem 2.6rem')};
  border-radius: 4px;
  margin-top: 0.5rem;
  border: 1px solid ${({ selected }) => (selected ? '#1557bf' : '#eaeaea')};
  display: flex;
  align-items: center;
`

const NextAvailableSlotContainer = styled.div`
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
`

const SelectedText = styled(Text)`
  display: block;
`

const SlotStatusText = styled(Text)`
  margin-left: auto;
`

const StyledButton = styled.button`
  outline: none;
  color: #ffffff;
  background-color: #1557bf;
  padding: 1rem 0;
  width: 90%;
  max-width: 21.5rem;
  border: none;
  border-radius: 2rem;
  font-weight: bold;
  font-size: 1rem;
  position: fixed;
  bottom: 1.5rem;
  z-index: 1;
  left: 0;
  right: 0;
  margin: 0 auto;
  cursor: pointer;
`
const StyledCheckoutHeader = styled(CheckoutHeader)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`
const GlobalStyle = createGlobalStyle`
  body {
    overflow: ${({ hide }) => (hide ? 'hidden' : 'auto')};
  }
`

const MobileSlotsView = ({ slots, selectedSlot, slot, onChange, onClose }) => {
  function handleSubmit(e) {
    e.preventDefault()
    onClose()
  }
  return (
    <React.Fragment>
      <StyledCheckoutHeader title="Checkout" onClose={onClose} />
      <StyledForm onSubmit={handleSubmit}>
        {slots.map(slt => {
          let timeStamp = moment(slt, ['YYYY-MM-DD'])
          let day = ''
          if (
            timeStamp.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
          ) {
            day = 'Today'
          } else if (
            timeStamp.format('YYYY-MM-DD') ===
            moment()
              .add(1, 'days')
              .format('YYYY-MM-DD')
          ) {
            day = 'Tomorrow'
          } else {
            day = timeStamp.format('dddd')
          }
          return (
            <StyledUl key={slt}>
              <Text size="large" color="#333333" weight="bold">
                {day + ', ' + timeStamp.format('D MMMM YYYY')}
              </Text>
              {slot[slt] &&
                slot[slt].map(time => {
                  let label =
                    time.type === 'STANDARD'
                      ? moment(time.startTime).format('hh:mm a') +
                        ' - ' +
                        moment(time.endTime).format('hh:mm a')
                      : `Within ${Math.round(
                          moment.duration(time.endTime).asMinutes()
                        )} minutes`

                  let slotKey = slt + '/' + time.id
                  return (
                    <StyledLi
                      key={slotKey}
                      available={time.available}
                      selected={slotKey === selectedSlot}
                    >
                      {time.available ? (
                        <Radio
                          label={label}
                          name="slotDetails"
                          id={slotKey}
                          checked={slotKey === selectedSlot}
                          value={slotKey}
                          onChange={onChange}
                          color="#1557b5"
                        />
                      ) : (
                        <React.Fragment>
                          <Text size="medium" color="#333333" weight="bold">
                            {label}
                          </Text>
                          <SlotStatusText
                            size="small"
                            color="#333333"
                            weight="bold"
                          >
                            Full
                          </SlotStatusText>
                        </React.Fragment>
                      )}
                    </StyledLi>
                  )
                })}
            </StyledUl>
          )
        })}
        <StyledButton>Confirm timeslot</StyledButton>
      </StyledForm>
    </React.Fragment>
  )
}

class SlotSelector extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDateSelect = this.handleDateSelect.bind(this)
    this.handleSlotSelect = this.handleSlotSelect.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidUpdate(prevProps) {
    const prevValue = prevProps.data && prevProps.data.values
    const currentValue = this.props.data && this.props.data.values
    if (prevValue !== currentValue) {
      const { preferredDate, preferredSlotId } = currentValue
      if (!preferredDate || !preferredSlotId) {
        this.props.onChange(['slotSelector', 'valid'], false)
      } else {
        this.props.onChange(['slotSelector', 'valid'], true)
      }
    }
    if (
      this.props.activeChild === 'slotSelector' &&
      prevProps.activeChild !== this.props.activeChild
    ) {
      window.scrollTo(0, 0)
    }
  }

  handleChange(e) {
    let { value } = e.target
    let [preferredDate, preferredSlotId] = value.split('/')
    let preferredSlotObj = { preferredDate, preferredSlotId }
    this.props.onChange(['slotSelector', 'values'], preferredSlotObj)
  }

  handleDateSelect(date) {
    this.props.onChange(['slotSelector', 'values', 'preferredDate'], date)
  }

  handleSlotSelect(slotId) {
    this.props.onChange(['slotSelector', 'values', 'preferredSlotId'], slotId)
  }

  formatDate(date) {
    return date === moment().format('YYYY-MM-DD')
      ? 'Today'
      : date ===
        moment()
          .add(1, 'days')
          .format('YYYY-MM-DD')
      ? 'Tomorrow'
      : moment(date, 'YYYY-MM-DD').format('D MMM YYYY')
  }

  formatSlot(slot) {
    return slot.type === 'STANDARD'
      ? moment(slot.startTime).format('hh:mm a') +
          ' - ' +
          moment(slot.endTime).format('hh:mm a')
      : `Within ${moment.duration(slot.endTime).asMinutes()} minutes`
  }

  findNextAvailableSlot(slots = {}) {
    let nextDate, nextSlot
    for (let key in slots) {
      for (let i = 0; i < slots[key].length; i++) {
        if (slots[key][i].available) {
          nextDate = this.formatDate(key)
          nextSlot = this.formatSlot(slots[key][i])
          return {
            nextDate,
            nextSlot,
          }
        }
      }
    }
    return {}
  }

  handleClose(e) {
    e && e.stopPropagation()
    this.props.onClick('account')
  }

  render() {
    let { data, slotData, activeChild, onClick } = this.props
    let { slot } = slotData
    let slots = Object.keys(slot)
    let selectedSlot =
      data.values.preferredDate + '/' + data.values.preferredSlotId
    let { nextDate, nextSlot } = this.findNextAvailableSlot(slot)
    return (
      <Container
        expanded={activeChild === 'slotSelector'}
        onClick={() => data.valid && onClick('slotSelector')}
        valid={data.valid}
      >
        <GlobalStyle hide={activeChild === 'slotSelector'} />
        {activeChild !== 'slotSelector' && (
          <Heading>
            <span>Timeslot</span>
            <Text color="#1557bf" weight="bold">
              Change
            </Text>
          </Heading>
        )}
        {!(data.values.preferredDate && data.values.preferredSlotId)
          ? nextDate &&
            nextSlot &&
            activeChild !== 'slotSelector' && (
              <NextAvailableSlotContainer>
                <Text size="small" weight="bold">
                  Earliest timeslot
                </Text>
                <Text>
                  {nextDate}&nbsp;{nextSlot}
                </Text>
              </NextAvailableSlotContainer>
            )
          : activeChild !== 'slotSelector' && (
              <SelectedText color="#333333">
                {this.formatDate(data.values.preferredDate) +
                  ', ' +
                  this.formatSlot(
                    slot[data.values.preferredDate].filter(
                      slot =>
                        slot.id === parseInt(data.values.preferredSlotId, 10)
                    )[0]
                  )}
              </SelectedText>
            )}
        {activeChild === 'slotSelector' && (
          <MobileSlotsView
            slots={slots}
            selectedSlot={selectedSlot}
            slot={slot}
            onChange={this.handleChange}
            onClose={this.handleClose}
          />
        )}
      </Container>
    )
  }
}

SlotSelector.defaultProps = {
  slotData: {
    slot: {},
  },
}

export default SlotSelector
