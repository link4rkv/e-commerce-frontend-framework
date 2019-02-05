import React, { Component } from 'react'
import styled from 'styled-components'
import Text from '../Text'

const StoreSelectorContainer = styled.div`
  padding: ${({ showSelectedStore }) => (showSelectedStore ? '0.5rem' : '1rem')}
    0 0;

  h3 {
    margin-bottom: 1rem;
    font-weight: bold;
    color: #333333;
  }
`
const StoreAddressContainer = styled.div`
  padding: 0.7rem 0 0.4rem;
  background-color: #ffffff;
  border-top: 1px solid #eaeaea;
  cursor: pointer;
  width: 100%;
`

const StoreName = styled(Text)`
  display: block;
`

const SelectedStore = styled.div`
  cursor: pointer;
`

class StoreSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSelectedStore: this.props.showSelectedStore,
    }
    this.selectStore = this.selectStore.bind(this)
    this.handleToggleSelected = this.handleToggleSelected.bind(this)
  }
  selectStore(store) {
    let pickupAddress = {
      type: 'pickup',
      address: store.Store.address,
      storeId: store.Store.id,
      name: store.Store.name,
    }
    if (this.props.showSelectedStore && !this.state.showSelectedStore) {
      this.handleToggleSelected()
    }
    this.props.setLocation && this.props.setLocation({ ...pickupAddress })
    this.props.onSelect && this.props.onSelect()
  }

  handleToggleSelected() {
    this.setState({ showSelectedStore: !this.state.showSelectedStore })
  }

  render() {
    const { pickupLocations, address } = this.props
    const { storeId } = address || {}
    const { showSelectedStore } = this.state
    const selectedStore =
      pickupLocations &&
      pickupLocations.filter(({ Store }) => Store.id === storeId)
    return (
      <StoreSelectorContainer showSelectedStore={this.props.showSelectedStore}>
        {showSelectedStore && selectedStore[0] && (
          <SelectedStore onClick={this.handleToggleSelected}>
            <StoreName size="medium" weight="bold" color="#1557bf">
              {selectedStore[0].Store.name}
            </StoreName>
            <Text size="medium" color="#696969">
              {selectedStore[0].Store.address}
            </Text>
          </SelectedStore>
        )}
        {(!showSelectedStore || !selectedStore[0]) && (
          <React.Fragment>
            <h3>Select a store to collect at</h3>
            {pickupLocations &&
              pickupLocations.map(store => (
                <StoreAddressContainer
                  key={'store' + store.Store.id}
                  onClick={() => this.selectStore(store)}
                  data-testid="store"
                >
                  <StoreName size="medium" weight="bold" color="#333333">
                    {store.Store.name}
                  </StoreName>
                  <Text size="medium" color="#696969">
                    {store.Store.address}
                  </Text>
                </StoreAddressContainer>
              ))}
          </React.Fragment>
        )}
      </StoreSelectorContainer>
    )
  }
}
export default StoreSelector
