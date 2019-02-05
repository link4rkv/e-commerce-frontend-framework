import React, { Component } from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import Filter from '../../components/Filter/Filter'
import Text from '../../components/Text'
import GoogleMap, {
  MarkerWithLabel,
  StandaloneSearchBar,
} from '../../components/GoogleMap'

import { from } from '../../lib/Media'

import { storeDummyData } from '../../mocks'

const Container = styled.div`
  display: flex;
  position: relative;
  height: calc(100vh - 8.75rem);

  ${from('desktop')} {
    height: auto;
  }
`

const FilterContainer = styled.div`
  display: flex;
  margin: 1.125rem 0rem 0;
  width: max-content;
  z-index: 2;
  position: absolute;
  right: 1rem;
  opacity: ${({ showPopup }) => (showPopup ? '0.2' : '1')};

  ${from('tablet')} {
    right: 2rem;
    margin-top: 0.5rem;
  }

  ${from('desktop')} {
    flex-direction: column;
    position: static;
    margin: 0rem;
    margin-right: 2rem;
    > div:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
`

const MapContainer = styled.div`
  width: calc(100% + 1rem);
  height: calc(100vh - 6.75rem);
  position: absolute;
  top: -1rem;
  left: -0.5rem;
  opacity: ${({ showPopup }) => (showPopup ? '0.2' : '1')};

  ${from('tablet')} {
    height: calc(100vh - 5.75rem);
    width: calc(100% + 4rem);
    top: -1.5rem;
    left: -2rem;
  }

  ${from('desktop')} {
    width: calc(100% - 15.5rem);
    height: auto;
    position: static;
    margin-left: -2rem;
  }
`

const StyledLabel = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  width: 18rem;
  border-radius: 4px;
  box-shadow: 0 13px 15px 0 rgba(0, 0, 0, 0.12);
`

const StoreAddress = styled(Text)`
  display: block;
  width: 80%;
  margin-top: 0.5rem;
`

const StoreFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const FeatureButton = styled(Text)`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border: 1px solid #333333;
  border-radius: 2px;
  margin: 0.5rem 0.5rem 0 0;
`

const LocationAccessPopup = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  box-shadow: 0 13px 15px 0 rgba(0, 0, 0, 0.12);
  margin: auto;
  width: 20rem;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 15rem;
  border-radius: 4px;
`

const StyledText = styled(Text)`
  display: block;
  margin-top: 0.3rem;
`

const AllowButton = styled.button`
  width: 100%;
  padding: 1rem;
  outline: none;
  border: none;
  background-color: #1557bf;
  color: #ffffff;
  margin: 1rem 0;
  border-radius: 2rem;
  font-weight: bold;
  cursor: pointer;
`

const CancelButton = styled.button`
  outline: none;
  border: none;
  width: max-content;
  display: block;
  background-color: transparent;
  color: #1557bf;
  margin: 0 auto;
  font-weight: bold;
  cursor: pointer;
`

const StyledInput = styled.input`
  position: absolute;
  z-index: 1;
  margin-top: 2rem;
  left: 1rem;
  width: 65%;
  padding: 0.7rem 1rem;
  border-radius: 1.5rem;
  outline: none;
  border: none;
  box-shadow: 0 13px 15px 0 rgba(0, 0, 0, 0.12);

  ${from('tablet')} {
    width: 40%;
  }

  ${from('desktop')} {
    left: 17.5rem;
    width: 60%;
  }
`

const DirectionLink = styled.a`
  display: block;
  color: #1557bf;
  font-size: 0.875rem;
  text-decoration: none;
  font-weight: bold;
  width: max-content;
  margin-left: auto;
  margin-top: 0.3rem;
`

const Popup = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`

const GOOGLE_DIRECTION_URL = 'https://www.google.com/maps/dir/?api=1'

class StoreLocator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false,
      currentLocation: {
        lat: '',
        lng: '',
      },
    }
    this.handleMapMounted = this.handleMapMounted.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.handleResetLocation = this.handleResetLocation.bind(this)
    this.handleCurrentLocation = this.handleCurrentLocation.bind(this)
  }
  getMarkers(pickupLocations) {
    if (pickupLocations) {
      let markers = pickupLocations.map(({ Store }) => ({
        lat: parseFloat(Store.latitude),
        lng: parseFloat(Store.longitude),
      }))

      return markers
    } else {
      return []
    }
  }

  handleMapMounted(node) {
    this.map = node
  }

  getCenter(locations) {
    if (locations.length > 0 && window.google) {
      let bounds = new window.google.maps.LatLngBounds()
      for (let i = 0; i < locations.length; i++) {
        bounds.extend(locations[i])
      }
      this.map && this.map.fitBounds(bounds)
      return bounds.getCenter()
    }
  }

  handleMarkerClick(index, e) {
    let { organizationData } = this.props
    let { pickupLocations } = organizationData || {}
    this.setState({
      activeMarker: index,
      activeStore:
        pickupLocations &&
        pickupLocations[index] &&
        pickupLocations[index].Store,
    })
    if (e && e.target && e.target.nodeName === 'A') {
      window.open(e.target.href, '_blank')
    }
  }

  handleResetLocation() {
    this.getCenter(this.state.markers)
  }

  handleCurrentLocation() {
    const success = position => {
      let currentLocation = {}

      currentLocation.lat = position.coords.latitude
      currentLocation.lng = position.coords.longitude

      this.setState({ currentLocation, showPopup: false })
    }

    const error = error => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.setState({ showPopup: true })
          break
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  componentDidMount() {
    let { organizationData } = this.props
    let { pickupLocations } = organizationData || {}
    this.setState(
      { mounted: true, markers: this.getMarkers(pickupLocations) },
      this.handleCurrentLocation
    )
  }

  render() {
    let { organizationData } = this.props
    let {
      activeMarker,
      mounted,
      markers,
      activeStore,
      showPopup,
      currentLocation,
    } = this.state
    return (
      <Layout
        organizationData={organizationData}
        noWrapper="fromDesktop"
        hideCheckoutAddress
      >
        <Container>
          <FilterContainer showPopup={showPopup}>
            <Filter data={storeDummyData} variant="sitemap" />
          </FilterContainer>
          <MapContainer showPopup={showPopup}>
            <StandaloneSearchBar>
              <StyledInput placeholder="Search store..." />
            </StandaloneSearchBar>
            <GoogleMap
              onMapMounted={this.handleMapMounted}
              zoom={12}
              containerClassName="address-map"
              getCenter={() => this.getCenter(markers)}
              defaultOptions={{
                streetViewControl: false,
                zoomControl: true,
                fullscreenControl: true,
                mapTypeControl: false,
              }}
            >
              {mounted &&
                window.google &&
                markers &&
                markers.map((position, index) => {
                  let directionUrl =
                    activeStore &&
                    GOOGLE_DIRECTION_URL +
                      (currentLocation.lat && currentLocation.lng
                        ? `origin=${currentLocation.lat},${currentLocation.lng}`
                        : '') +
                      `&destination=${activeStore.latitude},${
                        activeStore.longitude
                      }`

                  return (
                    <MarkerWithLabel
                      position={position}
                      key={'key' + position.lat + '-' + position.lng}
                      labelAnchor={new window.google.maps.Point(0, 0)}
                      onClick={e => this.handleMarkerClick(index, e)}
                      clickable
                      defaultClickable
                    >
                      {activeMarker === index && activeStore ? (
                        <StyledLabel>
                          <Text color="#333333" size="large" weight="bold">
                            {activeStore.name}
                          </Text>
                          <StoreFeatures>
                            <FeatureButton
                              color="#4a4a4a"
                              size="small"
                              weight="bold"
                            >
                              Click & Collect
                            </FeatureButton>
                            <FeatureButton
                              color="#4a4a4a"
                              size="small"
                              weight="bold"
                            >
                              Scan & Go
                            </FeatureButton>
                          </StoreFeatures>
                          <StoreAddress color="#696969">
                            {activeStore.address}
                          </StoreAddress>
                          <DirectionLink
                            taget="_blank"
                            rel="noopener noreferrer"
                            href={directionUrl}
                          >
                            Get Directions
                          </DirectionLink>
                        </StyledLabel>
                      ) : (
                        <div />
                      )}
                    </MarkerWithLabel>
                  )
                })}
            </GoogleMap>
          </MapContainer>
          {showPopup && (
            <Popup>
              <LocationAccessPopup>
                <Text color="#333333" weight="bold" size="xl">
                  Allow us to access your location
                </Text>
                <StyledText color="#696969">
                  Fairprice needs access to your location in order for us to
                  know where you are; and show the nearest store to you.
                </StyledText>
                <AllowButton
                  onClick={() => this.setState({ showPopup: false })}
                >
                  Allow location access
                </AllowButton>
                <CancelButton
                  onClick={() => this.setState({ showPopup: false })}
                >
                  Cancel
                </CancelButton>
              </LocationAccessPopup>
            </Popup>
          )}
        </Container>
      </Layout>
    )
  }
}

export default StoreLocator
