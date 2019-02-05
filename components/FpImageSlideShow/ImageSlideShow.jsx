import React from 'react'
import ImageSlideShowCarousel from '../ImageSlideShowCarousel/'
import ImageSlideShowCard from '../ImageSlideShowCard'
import styled from 'styled-components'

const ImageSlideShowContainer = styled.div`
  margin-bottom: 2rem;
`
const ImageSlideShowCardWrp = styled.div`
  display: inline-block;

  &:not(:last-child) {
    margin-right: 1rem;
  }
`
const ImageSlideShow = props => {
  const { images } = props.data

  return (
    <ImageSlideShowContainer>
      <ImageSlideShowCarousel>
        {images.map((image, index) => {
          return (
            <ImageSlideShowCardWrp
              key={'slide-show-card' + image.imageUrl + index}
            >
              <ImageSlideShowCard image={image} />
            </ImageSlideShowCardWrp>
          )
        })}
      </ImageSlideShowCarousel>
    </ImageSlideShowContainer>
  )
}

export default ImageSlideShow
