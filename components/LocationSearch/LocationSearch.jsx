import React from 'react'
import styled from 'styled-components'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import getConfig from 'next/config'
import Input from '../Input'
import fetch from 'isomorphic-unfetch'
import Loader from '../Loader/Loader'

const {
  publicRuntimeConfig: { API_URL, GOOGLE_MAPS_API_KEY },
} = getConfig()

const StyledLocationSearch = styled.div`
  > .autocomplete-dropdown-container {
    display: block;
    overflow: hidden;
  }

  > .autocomplete-dropdown-container .suggestion-item {
    padding: 0.6rem 0.45rem;
    background-color: #ffffff;
    line-height: 1.25rem;
    font-size: 0.75rem;
    border-top: 1px solid #eaeaea;
    color: #696969;
  }

  > .autocomplete-dropdown-container .suggestion-item.active {
    background-color: #f8f8f8;
  }

  .autocomplete-dropdown-container .suggestion-item .main-text {
    font-size: 0.9rem;
    font-weight: 600;
    color: #333333;
    display: block;
  }

  > .autocomplete-dropdown-container .loader {
    margin: 1.25rem auto 0.65rem;
  }
`
const CurrentLocation = styled.div`
  color: #1557bf;
  font-size: 0.85rem;
  line-height: 1rem;
  cursor: pointer;
  width: max-content;
`

const StyledLoader = styled(Loader)`
  margin: 2rem auto;
`
const ErrorText = styled.div`
  color: #dd0d42;
  font-size: 0.8rem;
  margin: 0.5rem 0;
`

const NoResult = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: #696969;
  margin-bottom: 0.5rem;
`

class LocationSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: props.address || '',
      hideBackground: props.hideBackground || false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.clearText = this.clearText.bind(this)
    this.handleGetCurrentLocation = this.handleGetCurrentLocation.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  handleChange(address) {
    this.setState({ address })
  }

  async checkIfDeliverySupported(location, bypassCheck) {
    if (bypassCheck) {
      return true
    }
    try {
      const queryString = Object.keys(location)
        .map(key => `${key}=${location[key]}`)
        .join('&')
      let response = await fetch(`${API_URL}/serviceable-area?${queryString}`)
      response = await response.json()
      if (response.data && response.status === 'SUCCESS') {
        return true
      } else {
        return false
      }
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  findPinNCity(result) {
    let pincode, city
    if (result && result.address_components) {
      pincode = result.address_components.filter(
        elm => elm.types && elm.types.includes('postal_code')
      )
      city = result.address_components.filter(
        elm => elm.types && elm.types.includes('locality')
      )
    }

    return { pincode, city }
  }

  handleSelect(address) {
    this.setState({ address })
    geocodeByAddress(address)
      .then(results => {
        this.setState({ loading: true })
        let { pincode, city } = results && this.findPinNCity(results[0])
        return getLatLng(results[0]).then(latLng => ({
          location: latLng,
          pincode: pincode[0] && pincode[0].long_name,
          address: results[0].formatted_address,
          city: city.length && city[0].long_name,
        }))
      })
      .then(async latLng => {
        const deliveryAreaSupported = await this.checkIfDeliverySupported(
          {
            pincode: latLng.pincode,
            latitude: latLng.location.lat,
            longitude: latLng.location.lng,
          },
          this.props.bypassServiceabilityCheck
        )
        if (deliveryAreaSupported) {
          this.setState({ loading: false, error: null }, () => {
            this.props.setLocation &&
              this.props.setLocation({ ...latLng, type: 'delivery' })
          })
        } else {
          this.setState({
            error: 'Sorry, this address is not serviceable',
            loading: false,
          })
        }
      })
      .catch(error => error)
  }

  handleError(status, clearSuggestions) {
    if (status === 'ZERO_RESULTS') {
      clearSuggestions()
      this.setState({ noResult: true })
    }
  }

  clearText() {
    this.setState({ address: '' }, () => {
      this.props.setLocation &&
        this.props.type === 'delivery' &&
        this.props.setLocation({ location: null, address: '' })
    })
  }

  handleGetCurrentLocation() {
    const succes = position => {
      let { latitude, longitude } = position.coords
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
      )
        .then(response => response.json())
        .then(async response => {
          const deliveryAreaSupported = await this.checkIfDeliverySupported(
            {
              latitude,
              longitude,
            },
            this.props.bypassServiceabilityCheck
          )

          if (deliveryAreaSupported) {
            let { pincode, city } = this.findPinNCity(response.results[0])
            const address = {
              address: response.results[0].formatted_address,
              pincode: pincode && pincode[0] && pincode[0].long_name,
              city: city && city[0] && city[0].long_name,
              location: {
                lat: latitude,
                lng: longitude,
              },
            }
            this.setState({ loading: false, error: null }, () => {
              this.props.setLocation &&
                this.props.setLocation({ ...address, type: 'delivery' })
            })
          } else {
            this.setState({
              error: 'Sorry, this address is not serviceable',
              loading: false,
            })
          }
        })
        .catch(() => {
          this.setState({
            error: 'Unable to detect the location',
            loading: false,
          })
        })
    }
    const error = () => {
      this.setState({ error: 'Unexpected error occurred' })
    }
    if (navigator.geolocation) {
      this.setState({ loading: true })
      navigator.geolocation.getCurrentPosition(succes, error)
    } else {
      this.setState({ error: `Browser doesn't support Geolocation` })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.address !== this.props.address) {
      this.setState({ address: this.props.address })
    }
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.handleError}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <StyledLocationSearch data-testid="location-search">
            <Input
              {...getInputProps()}
              required
              label="Postal code or delivery address"
              clear={this.clearText}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div className="suggestion-item">Loading...</div>}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? 'suggestion-item active'
                  : 'suggestion-item'
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <span className="main-text">
                      {suggestion.formattedSuggestion.mainText}
                    </span>
                    <span className="secondary-text">
                      {suggestion.formattedSuggestion.secondaryText}
                    </span>
                  </div>
                )
              })}
              {this.state.noResult && !suggestions.length && (
                <NoResult>No result &#x2639;</NoResult>
              )}
              {this.state.loading && <StyledLoader />}
            </div>
            {this.state.error && <ErrorText>{this.state.error}</ErrorText>}
            {!this.state.loading && (
              <CurrentLocation onClick={this.handleGetCurrentLocation}>
                Or use my current location
              </CurrentLocation>
            )}
          </StyledLocationSearch>
        )}
      </PlacesAutocomplete>
    )
  }
}

export default LocationSearch
