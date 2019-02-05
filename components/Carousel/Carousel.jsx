import React, { Component } from 'react'
import Arrow from './Arrow/'
import styled from 'styled-components'
import { from, visible } from '../../lib/Media'

const StyledCarouselWrapper = styled.div`
  position: relative;
`

const ArrowContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;

  ${({ direction }) =>
    direction === 'left' ? 'left: -1.25rem;' : 'right: -1.25rem;'}

  ${visible(from('desktop'))}
  ${from('hd')} {
    display: ${props => (props.hideArrow ? 'none' : 'inherit')};
  }
`
const CarouselContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  position: relative;
  scrollbar-width: none; /*To hide scrollbar in firefox */

  ${from('desktop')} {
    overflow-x: hidden;
  }

  &--left {
    left: -0.94rem;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

class Carousel extends Component {
  constructor(props) {
    super(props)
    this.carouselData = this.props.children
    this.state = {
      currentImageIndex: 0,
      translateValue: 0,
      showRightArrow: true,
    }

    this.nextSlide = this.nextSlide.bind(this)
  }

  nextSlide() {
    if (
      this.getChildrenWidth() -
        (-this.state.translateValue + this.slideWidth()) <
      this.slideWidth()
    ) {
      if (
        this.props.hasMore &&
        this.props.infiniteScrolling !== false &&
        this.getChildrenWidth() + this.state.translateValue ===
          this.slideWidth()
      ) {
        this.props.loadChildren()
      } else {
        if (this.getChildrenWidth() > this.slideWidth()) {
          this.setState(prevState => ({
            translateValue:
              prevState.translateValue +
              -(
                this.getChildrenWidth() -
                (-this.state.translateValue + this.slideWidth())
              ),
            showRightArrow: false,
          }))
        }
      }
    } else {
      this.setState(prevState => ({
        translateValue: prevState.translateValue + -this.slideWidth(),
      }))
    }
  }

  previousSlide() {
    if (this.state.translateValue - -this.slideWidth() >= 0) {
      this.setState({
        translateValue: 0,
        showRightArrow: true,
      })
    } else {
      this.setState(prevState => ({
        translateValue: prevState.translateValue - -this.slideWidth(),
        showRightArrow: true,
      }))
    }
  }

  slideWidth = () => {
    return (
      this.nodeRef && this.nodeRef.querySelector('.elements-div').clientWidth
    )
  }

  getChildrenWidth = () => {
    const children =
      this.nodeRef && this.nodeRef.querySelector('.elements-div').children
    let totalWidth = 0
    for (let i = 0; i < children.length; i++) {
      totalWidth += children[i].offsetWidth
      let style =
        children[i].currentStyle || window.getComputedStyle(children[i])
      let margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight)
      totalWidth += margin
    }
    return totalWidth
  }

  componentDidUpdate(prevProps) {
    let isOverFlow = this.nodeRef && this.getChildrenWidth() > this.slideWidth()
    if (isOverFlow !== (this.state && this.state.isOverFlow)) {
      this.setState({ isOverFlow })
    }
    if (
      prevProps.children &&
      prevProps.children.length &&
      prevProps.children.length !== this.props.children.length
    ) {
      this.setState({ translateValue: 0, showRightArrow: true })
    }
    if (
      this.props.resetPosition &&
      prevProps.resetPosition !== this.props.resetPosition
    ) {
      this.setState(
        { translateValue: 0, showRightArrow: true },
        this.props.resetCarouselPosition
      )
    }
  }

  componentDidMount() {
    this.setState({
      isOverFlow: this.nodeRef && this.getChildrenWidth() > this.slideWidth(),
    })
  }

  render() {
    let isOverFlow = this.state && this.state.isOverFlow
    return (
      <StyledCarouselWrapper
        className="horizontal-carousel"
        ref={node => {
          this.nodeRef = node
        }}
      >
        {isOverFlow && this.state.translateValue !== 0 && (
          <ArrowContainer direction="left" hideArrow={this.props.hideArrow}>
            <Arrow
              direction="left"
              clickFunction={() => this.previousSlide()}
            />
          </ArrowContainer>
        )}
        <CarouselContainer>
          <div
            className={
              'elements-div' + (!isOverFlow ? ' content-not-overflow' : '')
            }
            style={{
              position: 'relative',
              left: `${this.state.translateValue}px`,
              transition: 'left ease-out 0.45s',
            }}
            data-testid="carousel"
          >
            {this.props.children}
          </div>
        </CarouselContainer>
        {isOverFlow && this.state.showRightArrow && (
          <ArrowContainer direction="right" hideArrow={this.props.hideArrow}>
            <Arrow direction="right" clickFunction={() => this.nextSlide()} />
          </ArrowContainer>
        )}
      </StyledCarouselWrapper>
    )
  }
}

export default Carousel
