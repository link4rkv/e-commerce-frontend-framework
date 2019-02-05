import React, { Component } from 'react'
import { GoogleMap, withGoogleMap, Marker } from 'react-google-maps'
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import StandaloneSearchBar from 'react-google-maps/lib/components/places/StandaloneSearchBox'

class BaseMap extends Component {
  render() {
    const { props } = this
    const defaultOptions = props.defaultOptions || null
    return (
      <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={props.zoom || 10}
        onClick={props.onMapClick || null}
        center={props.center || (props.getCenter && props.getCenter())}
        onBoundsChanged={props.onBoundsChanged}
        defaultOptions={defaultOptions}
      >
        {props.children}
      </GoogleMap>
    )
  }
}

const Map = withGoogleMap(BaseMap)

const GoogleMaps = props => {
  return (
    <Map
      containerElement={
        <div
          className={props.containerClassName}
          style={{ height: `100%`, width: '100%' }}
        />
      }
      mapElement={<div style={{ height: `100%` }} />}
      {...props}
    >
      {props.children}
    </Map>
  )
}
export default GoogleMaps

export { Marker, MarkerWithLabel, StandaloneSearchBar }
