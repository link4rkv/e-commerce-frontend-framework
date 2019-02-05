/**
 * Copied from react-places-autocomplete
 * https://github.com/hibiken/react-places-autocomplete/blob/master/src/tests/initialRender.test.js
 */
const GEOCODE_RESULT = {
  'San Francesco': [
    {
      address_components: [
        {
          long_name: 'San Francisco',
          short_name: 'SF',
          types: ['locality', 'political'],
        },
        {
          long_name: 'San Francisco County',
          short_name: 'San Francisco County',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'California',
          short_name: 'CA',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political'],
        },
      ],
      formatted_address: 'San Francisco, CA, USA',
      geometry: {
        bounds: {
          south: 37.6398299,
          west: -123.17382499999997,
          north: 37.9298239,
          east: -122.28178000000003,
        },
        location: { lat: () => 37.7749295, lng: () => -122.41941550000001 },
        location_type: 'APPROXIMATE',
        viewport: {
          south: 37.70339999999999,
          west: -122.52699999999999,
          north: 37.812,
          east: -122.34820000000002,
        },
      },
      place_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
      types: ['locality', 'political'],
    },
  ],
}

class GeocoderMock {
  geocode({ address, placeId }, callback) {
    if (address) {
      this._geocodeAddress(address, callback)
    } else if (placeId) {
      this._geocodePlaceID(placeId, callback)
    } else {
      callback({}, 'ZERO_RESULTS')
    }
  }

  _geocodeAddress(address, callback) {
    if (address.startsWith('San Francesco')) {
      callback(GEOCODE_RESULT['San Francesco'], 'OK')
    } else {
      callback([], 'ZERO_RESULTS')
    }
  }

  _geocodePlaceID(placeId, callback) {
    if (placeId === 'ChIJIQBpAG2ahYAR_6128GcTUEo') {
      callback(GEOCODE_RESULT['San Francisco'], 'OK')
    } else {
      callback([], 'ZERO_RESULTS')
    }
  }
}

class AutocompleteServiceMock {
  getPlacePredictions(_filters, callback) {
    if (_filters.input.startsWith('San France')) {
      callback(mockSuggestions, 'OK')
    } else {
      callback([], 'ZERO_RESULTS')
    }
  }
}

export const setupGoogleMock = () => {
  /*** Mock Google Maps JavaScript API ***/
  const google = {
    maps: {
      places: {
        AutocompleteService: AutocompleteServiceMock,
        PlacesServiceStatus: {
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
      },
      Geocoder: GeocoderMock,
      GeocoderStatus: {
        ERROR: 'ERROR',
        INVALID_REQUEST: 'INVALID_REQUEST',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
    },
  }
  global.window.google = google
}

export const mockSuggestions = [
  {
    description:
      'San Francesco del Deserto, Venice, Metropolitan City of Venice, Italy',
    id: 'a4c7c72b79d1e962c22ab20e64bbe342c8296e24',
    matched_substrings: [
      {
        length: 13,
        offset: 0,
      },
    ],
    place_id: 'ChIJkTukFjasfkcRcXA8xKlsGn8',
    reference: 'ChIJkTukFjasfkcRcXA8xKlsGn8',
    structured_formatting: {
      main_text: 'San Francesco del Deserto',
      main_text_matched_substrings: [
        {
          length: 13,
          offset: 0,
        },
      ],
      secondary_text: 'Venice, Metropolitan City of Venice, Italy',
    },
    terms: [
      {
        offset: 0,
        value: 'San Francesco del Deserto',
      },
      {
        offset: 27,
        value: 'Venice',
      },
      {
        offset: 35,
        value: 'Metropolitan City of Venice',
      },
      {
        offset: 64,
        value: 'Italy',
      },
    ],
    types: ['natural_feature', 'establishment', 'geocode'],
  },
  {
    description:
      'Camping San Francesco, Viale Selva Rosata, Duna Verde, Metropolitan City of Venice, Italy',
    id: 'ae8eef9c954b59c5ade1468a825c2b2c4c3e956c',
    matched_substrings: [
      {
        length: 13,
        offset: 8,
      },
    ],
    place_id: 'ChIJo9Une1X3e0cRVA9r2jqauN8',
    reference: 'ChIJo9Une1X3e0cRVA9r2jqauN8',
    structured_formatting: {
      main_text: 'Camping San Francesco',
      main_text_matched_substrings: [
        {
          length: 13,
          offset: 8,
        },
      ],
      secondary_text:
        'Viale Selva Rosata, Duna Verde, Metropolitan City of Venice, Italy',
    },
    terms: [
      {
        offset: 0,
        value: 'Camping San Francesco',
      },
      {
        offset: 23,
        value: 'Viale Selva Rosata',
      },
      {
        offset: 43,
        value: 'Duna Verde',
      },
      {
        offset: 55,
        value: 'Metropolitan City of Venice',
      },
      {
        offset: 84,
        value: 'Italy',
      },
    ],
    types: ['establishment'],
  },
  {
    description: 'San Francesco Al Campo, Metropolitan City of Turin, Italy',
    id: '89ba23e697edb1248cef1e776a504e6313054423',
    matched_substrings: [
      {
        length: 13,
        offset: 0,
      },
    ],
    place_id: 'ChIJ4z1tztVliEcRvgj00_5IAc8',
    reference: 'ChIJ4z1tztVliEcRvgj00_5IAc8',
    structured_formatting: {
      main_text: 'San Francesco Al Campo',
      main_text_matched_substrings: [
        {
          length: 13,
          offset: 0,
        },
      ],
      secondary_text: 'Metropolitan City of Turin, Italy',
    },
    terms: [
      {
        offset: 0,
        value: 'San Francesco Al Campo',
      },
      {
        offset: 24,
        value: 'Metropolitan City of Turin',
      },
      {
        offset: 52,
        value: 'Italy',
      },
    ],
    types: ['locality', 'political', 'geocode'],
  },
  {
    description:
      'San Francesco Basilica, Piazza San Francesco, Siena, Province of Siena, Italy',
    id: 'a5d3306568f62e87ac9bf1a4fad6e97aa6793f23',
    matched_substrings: [
      {
        length: 13,
        offset: 0,
      },
    ],
    place_id: 'ChIJixoVFccsKhMRRssSmA98bBg',
    reference: 'ChIJixoVFccsKhMRRssSmA98bBg',
    structured_formatting: {
      main_text: 'San Francesco Basilica',
      main_text_matched_substrings: [
        {
          length: 13,
          offset: 0,
        },
      ],
      secondary_text: 'Piazza San Francesco, Siena, Province of Siena, Italy',
    },
    terms: [
      {
        offset: 0,
        value: 'San Francesco Basilica',
      },
      {
        offset: 24,
        value: 'Piazza San Francesco',
      },
      {
        offset: 46,
        value: 'Siena',
      },
      {
        offset: 53,
        value: 'Province of Siena',
      },
      {
        offset: 72,
        value: 'Italy',
      },
    ],
    types: ['establishment'],
  },
  {
    description: 'San Francesco Foods, Unity Gate, Mississauga, ON, Canada',
    id: '31470455def301efdf4d4d6bbd987a71fef87edb',
    matched_substrings: [
      {
        length: 13,
        offset: 0,
      },
    ],
    place_id: 'ChIJ4SmWKDdCK4gRzuucD1c47QM',
    reference: 'ChIJ4SmWKDdCK4gRzuucD1c47QM',
    structured_formatting: {
      main_text: 'San Francesco Foods',
      main_text_matched_substrings: [
        {
          length: 13,
          offset: 0,
        },
      ],
      secondary_text: 'Unity Gate, Mississauga, ON, Canada',
    },
    terms: [
      {
        offset: 0,
        value: 'San Francesco Foods',
      },
      {
        offset: 21,
        value: 'Unity Gate',
      },
      {
        offset: 33,
        value: 'Mississauga',
      },
      {
        offset: 46,
        value: 'ON',
      },
      {
        offset: 50,
        value: 'Canada',
      },
    ],
    types: ['establishment'],
  },
]

export const reverseGeoCodeMock = {
  plus_code: {
    compound_code: 'QHFJ+X6 SoMa, San Francisco, CA, USA',
    global_code: '849VQHFJ+X6',
  },
  results: [
    {
      address_components: [
        {
          long_name: 'Unnamed Road',
          short_name: 'Unnamed Road',
          types: ['route'],
        },
        {
          long_name: 'San Francisco',
          short_name: 'SF',
          types: ['locality', 'political'],
        },
        {
          long_name: 'San Francisco County',
          short_name: 'San Francisco County',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'California',
          short_name: 'CA',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'United States',
          short_name: 'US',
          types: ['country', 'political'],
        },
        {
          long_name: '94102',
          short_name: '94102',
          types: ['postal_code'],
        },
      ],
      formatted_address: 'Unnamed Road, San Francisco, CA 94102, USA',
      geometry: {
        bounds: {
          northeast: {
            lat: 37.7751359,
            lng: -122.4194321,
          },
          southwest: {
            lat: 37.7748635,
            lng: -122.4195309,
          },
        },
        location: {
          lat: 37.7749997,
          lng: -122.4194815,
        },
        location_type: 'GEOMETRIC_CENTER',
        viewport: {
          northeast: {
            lat: 37.7763486802915,
            lng: -122.4181325197085,
          },
          southwest: {
            lat: 37.7736507197085,
            lng: -122.4208304802915,
          },
        },
      },
      place_id: 'ChIJU5jhjZ6AhYARYj2Za0nkVRY',
      types: ['route'],
    },
  ],
}

export const setMapMock = () => {
  global.window.google = {
    maps: {
      LatLng: function(lat, lng) {
        return {
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),

          lat: function() {
            return this.latitude
          },
          lng: function() {
            return this.longitude
          },
        }
      },
      LatLngBounds: function(ne, sw) {
        return {
          getSouthWest: function() {
            return sw
          },
          getNorthEast: function() {
            return ne
          },
        }
      },
      OverlayView: class {},
      InfoWindow: class {},
      Marker: class {},
      MarkerImage: class {},
      Map: class {
        setOptions() {}
        setZoom() {}
      },
      Point: class {},
      Size: class {},
    },
  }
}
