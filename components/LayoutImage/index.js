import React from 'react'
import styled from 'styled-components'
import NoImg from '../icons/NoImg'

const ImageContainer = styled.div`
  min-height: 12.5rem;
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 100%;
`

const LayoutImage = props => {
  if (props.data && props.data.imageUrl) {
    return (
      <ImageContainer
        image={props.data.imageUrl}
        data-testid="LayoutImageContainer"
      />
    )
  } else {
    return <NoImg />
  }
}

export default LayoutImage
