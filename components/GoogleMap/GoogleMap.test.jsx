import React from 'react'
import { render } from 'react-testing-library'
import GoogleMap from '../GoogleMap'
import { setMapMock } from '../../lib/jest/mockGoogleMapsSetup'

describe('hello', () => {
  beforeAll(() => setMapMock())

  it('map is rendered', () => {
    const { getByTestId } = render(
      <GoogleMap>
        <div data-testid="marker" />
      </GoogleMap>
    )

    expect(getByTestId('marker')).toBeInTheDocument()
  })
})
