import React, { Component } from 'react'
import Arrow from '../Arrow/Arrow'
import styled from 'styled-components'
import { from } from '../../lib/Media'

const DEFAULT_DELAY_MS = 3000

const StyledImageSlideShow = styled.div`
  position: relative;
  margin: 0;
  height: 100%;
`

const CarouselWrapper = styled.div`
  position: relative;
  height: 100%;
`

const ImagesWrp = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  &:before {
    content: '';
    display: block;
    padding-top: 29.41176%;
  }
`

const StyledLink = styled.a`
  position: absolute;
  display: ${props => (props.active ? 'block' : 'none')};
  top: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`

const StyledDiv = styled.div`
  position: absolute;
  display: ${props => (props.active ? 'block' : 'none')};
  top: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`

const CarouselIndicatorList = styled.ul`
  display: ${props => (props.dots && props.dots.hideDots ? 'none' : 'block')};
  padding: 0;
  margin: 0;
  list-style: none;
  height: auto;
  overflow: hidden;
  text-align: ${props => (props.dots && props.dots.align) || 'center'};
  ${props => props.dots && props.dots.paddingSide} : ${props =>
  props.dots && props.dots.paddingValue};
`

const CarouselIndicatorItem = styled.li`
  width: ${props =>
    props.dots && props.dots.width ? props.dots.width : '0.63rem'};
  height: ${props =>
    props.dots && props.dots.height ? props.dots.height : '0.63rem'};
  display: ${props => (props.dots.display ? 'inline-block' : 'none')};
  margin: 0.75rem 0.38rem;
  margin-bottom: ${props => (props.dots.display ? 'inherit' : '2rem')};
  border-radius: 50%;
  background-color: ${props =>
    props.active
      ? (props.dots && props.dots.activeColor) || '#ff0000'
      : (props.dots && props.dots.inActiveColor) || '#ffd900'};
  cursor: pointer;
`

const ArrowLeft = styled.div`
  display: ${props => (props.arrow && props.arrow.hide ? 'none' : 'inherit')};
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  z-index: 2;
  left: -1rem;
  ${from('desktop')} {
    display: inherit;
  }
`

const ArrowRight = styled(ArrowLeft)`
  left: unset;
  right: -1rem;
`

class ImageSlideShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImageIndex: 0,
    }

    this.nextSlide = this.nextSlide.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
  }

  handleTouchEnd() {
    let { start, end } = this.state
    if (start && end) {
      // to avoid nextslide call on single touch
      if (start - end < 0) {
        this.nextSlide('next')
      } else {
        this.nextSlide('previous')
      }
    }
    this.setState({
      start: 0,
      end: 0,
    })
  }

  handleTouchStart(event) {
    this.setState({ start: event.touches[0].clientX })
  }

  handleTouchMove(event) {
    this.setState({ end: event.touches[event.touches.length - 1].clientX })
  }

  componentDidMount() {
    if (!this.props.stopAutoScroll) {
      this.interval = setInterval(
        this.nextSlide,
        this.props.data.delay ? this.props.data.delay : DEFAULT_DELAY_MS
      )
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  nextSlide(slideTo = 'next') {
    const lastIndex = this.props.data.images
      ? this.props.data.images.length - 1
      : 0

    this.setState(prevState => {
      const { currentImageIndex } = prevState
      let shouldResetIndex = currentImageIndex === lastIndex
      let index = shouldResetIndex ? 0 : currentImageIndex + 1
      if (slideTo === 'previous') {
        shouldResetIndex = currentImageIndex === 0
        index = shouldResetIndex ? lastIndex : currentImageIndex - 1
      }

      return {
        currentImageIndex: index,
      }
    })
  }

  changeSlide(index) {
    this.setState({
      currentImageIndex: index,
    })
  }

  render() {
    const imagesData = this.props.data && this.props.data.images
    if (!imagesData) {
      return null
    }
    return (
      <StyledImageSlideShow
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        <CarouselWrapper data-testid="image-carousel">
          <ArrowLeft arrow={this.props.config && this.props.config.arrow}>
            <Arrow
              direction="left"
              onClick={() => this.nextSlide('previous')}
              glyph="&#9664;"
            />
          </ArrowLeft>
          <ImagesWrp data-testid="image-carousel">
            {imagesData &&
              imagesData.map((image, index) => {
                return this.props.clickLessImageSlideShow ? (
                  <StyledDiv
                    data-testid="image"
                    key={`image-${image.imageUrl}`}
                    active={index === this.state.currentImageIndex}
                    style={{ backgroundImage: `url(${image.imageUrl})` }}
                  />
                ) : (
                  <StyledLink
                    key={`image-${image.imageUrl}`}
                    href={image.link}
                    active={index === this.state.currentImageIndex}
                    style={{ backgroundImage: `url(${image.imageUrl})` }}
                    data-testid="image"
                  />
                )
              })}
          </ImagesWrp>
          <ArrowRight arrow={this.props.config && this.props.config.arrow}>
            <Arrow
              direction="right"
              onClick={() => this.nextSlide('next')}
              glyph="&#9654;"
            />
          </ArrowRight>
        </CarouselWrapper>
        <CarouselIndicatorList
          dots={this.props.config && this.props.config.dots}
        >
          {imagesData &&
            imagesData.map((image, index) => (
              <CarouselIndicatorItem
                key={`list-${image.imageUrl}`}
                onClick={() => this.changeSlide(index)}
                active={index === this.state.currentImageIndex}
                dots={this.props.config && this.props.config.dots}
              />
            ))}
        </CarouselIndicatorList>
      </StyledImageSlideShow>
    )
  }
}

ImageSlideShow.defaultProps = {
  dots: true,
}

export default ImageSlideShow
