import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import {
  setupGoogleMock,
  reverseGeoCodeMock,
} from '../../lib/jest/mockGoogleMapsSetup'
import LocationSearch from './'

const skipSomeTime = delayMs =>
  new Promise(resolve => setTimeout(resolve, delayMs))

const skipSomeTimeForMutationObserver = (delayMs = 50) =>
  skipSomeTime(delayMs, 50)

const mockGeolocation = () => {
  const mockGeolocation = {
    getCurrentPosition: cb => {
      cb({ coords: { latitude: 37.7749295, longitude: -122.41941550000001 } })
    },
    watchPosition: jest.fn(),
  }

  global.navigator.geolocation = mockGeolocation
}

const removeMockGeolocation = () => {
  global.navigator.geolocation = undefined
}

describe('initial render', () => {
  beforeAll(() => setupGoogleMock())
  afterAll(() => cleanup())

  it('initial render is working fine', () => {
    const { getByTestId, getByText } = render(<LocationSearch />)

    expect(getByTestId('location-search')).toBeInTheDocument()
    expect(getByText('Or use my current location')).toBeInTheDocument()
  })

  it('input onChange is rendering suggestions', async () => {
    const { getByTestId, getByText } = render(
      <LocationSearch address="San F" />
    )

    const input = getByTestId('input')

    fireEvent.change(input, { target: { value: 'San France' } })

    await skipSomeTimeForMutationObserver(200)

    expect(getByText(/San Francesco/)).toBeInTheDocument()
  })

  it('keyboard arrow keys are working', async () => {
    const { getByTestId } = render(<LocationSearch address="San F" />)

    const input = getByTestId('input')

    fireEvent.change(input, { target: { value: 'San France' } })

    await skipSomeTimeForMutationObserver(200)

    fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40, which: 40 })

    expect(input).toHaveAttribute(
      'value',
      'San Francesco del Deserto, Venice, Metropolitan City of Venice, Italy'
    )
  })

  it('no suggestion state is handled properly', async () => {
    const { getByTestId, getByText } = render(
      <LocationSearch address="Banga" />
    )

    const input = getByTestId('input')

    fireEvent.change(input, { target: { value: 'Bangalore' } })

    await skipSomeTimeForMutationObserver(200)

    expect(getByText(/No result/)).toBeInTheDocument()
  })

  it('address can be cleared', () => {
    const demoFunc = jest.fn()
    const { getByTestId } = render(
      <LocationSearch address="Banga" type="delivery" setLocation={demoFunc} />
    )

    fireEvent.click(getByTestId('remove-icon'))

    expect(demoFunc).toHaveBeenCalledWith({ location: null, address: '' })
  })

  it('onselect is getting triggered', async () => {
    const demoFunc = jest.fn()
    const { getByTestId, getByText } = render(
      <LocationSearch
        address="San F"
        setLocation={demoFunc}
        bypassServiceabilityCheck
      />
    )

    const input = getByTestId('input')

    fireEvent.change(input, { target: { value: 'San France' } })

    await skipSomeTimeForMutationObserver(200)

    fireEvent.click(getByText(/San Francesco/))

    await skipSomeTimeForMutationObserver(200)
    expect(demoFunc).toHaveBeenCalledWith({
      address: 'San Francisco, CA, USA',
      city: 'San Francisco',
      location: {
        lat: 37.7749295,
        lng: -122.41941550000001,
      },
      pincode: undefined,
      type: 'delivery',
    })
  })
})

describe('current location not support', () => {
  it('propmt if geolocation is not supported', async () => {
    const demoFunc = jest.fn()
    const { getByText } = render(
      <LocationSearch setLocation={demoFunc} bypassServiceabilityCheck />
    )

    fireEvent.click(getByText('Or use my current location'))

    await skipSomeTimeForMutationObserver(200)

    expect(getByText(`Browser doesn't support Geolocation`)).toBeInTheDocument()
  })
})

describe('geolocation supported', () => {
  beforeAll(mockGeolocation)
  afterAll(removeMockGeolocation)

  it('geolocation is supported', async () => {
    const demoFunc = jest.fn()
    fetch.resetMocks()

    fetch.mockResponseOnce(JSON.stringify(reverseGeoCodeMock))

    const { getByText } = render(
      <LocationSearch setLocation={demoFunc} bypassServiceabilityCheck />
    )

    fireEvent.click(getByText('Or use my current location'))

    await skipSomeTimeForMutationObserver(200)

    expect(demoFunc).toHaveBeenCalledWith({
      address: 'Unnamed Road, San Francisco, CA 94102, USA',
      city: 'San Francisco',
      location: {
        lat: 37.7749295,
        lng: -122.41941550000001,
      },
      pincode: '94102',
      type: 'delivery',
    })
  })
})
