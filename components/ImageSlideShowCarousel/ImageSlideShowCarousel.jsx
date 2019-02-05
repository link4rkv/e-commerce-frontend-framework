import React, { Component } from 'react'
import Arrow from './Arrow/Arrow'
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
    direction === 'left' ? 'left: -0.94rem;' : 'right: -0.94rem;'}

  ${visible(from('desktop'))}
`

const Carousal = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  position: relative;
  scrollbar-width: none; /*To hide scrollbar in firefox */

  /* To hide scrollbar in Chrome */
  &::-webkit-scrollbar {
    display: none;
  }

  ${from('desktop')} {
    overflow: hidden;
  }
`

class ImageSlideShowCarousel extends Component {
  constructor(props) {
    super(props)
    this.carouselData = this.props.children
    this.state = {
      currentImageIndex: 0,
      translateValue: 0,
      showRightArrow: true,
    }

    this.nextSlide = this.nextSlide.bind(this)
    this.previousSlide = this.previousSlide.bind(this)
    this.index = 0
  }

  nextSlide() {
    const remainingWidth =
      this.totalWidthOfChildrens -
      (this.slideWindowWidth + -this.state.translateValue)
    if (remainingWidth > 0) {
      this.setState(prevState => {
        if (remainingWidth < this.getCurretChildrenWidth(this.index)) {
          return {
            translateValue: prevState.translateValue - remainingWidth,
            showRightArrow: false,
          }
        }

        return {
          translateValue:
            prevState.translateValue -
            this.getCurretChildrenWidth(
              this.numberOfChild > this.index + 1 ? this.index++ : this.index
            ),
        }
      })
    }
  }

  previousSlide() {
    if (
      this.state.translateValue - -this.getCurretChildrenWidth(this.index) >=
      0
    ) {
      this.setState({
        translateValue: 0,
        showRightArrow: true,
      })
    } else {
      this.setState(prevState => ({
        translateValue:
          prevState.translateValue -
          -this.getCurretChildrenWidth(
            this.index - 1 >= 0 ? this.index-- : this.index
          ),
        showRightArrow: true,
      }))
    }
  }

  slideWidth = () => {
    this.slideWindowWidth =
      this.nodeRef && this.nodeRef.querySelector('.elements-div').clientWidth
    return (
      this.nodeRef && this.nodeRef.querySelector('.elements-div').clientWidth
    )
  }

  getChildrenWidth = () => {
    const children =
      this.nodeRef && this.nodeRef.querySelector('.elements-div').children
    this.numberOfChild = children.length
    let totalWidth = 0
    for (let i = 0; i < children.length; i++) {
      totalWidth += children[i].offsetWidth
      let style =
        children[i].currentStyle || window.getComputedStyle(children[i])
      let margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight)
      totalWidth += margin
    }
    this.totalWidthOfChildrens = totalWidth
    return totalWidth
  }

  getCurretChildrenWidth = index => {
    const children =
      this.nodeRef && this.nodeRef.querySelector('.elements-div').children
    let totalWidth = 0
    totalWidth += children[index].offsetWidth
    let style =
      children[index].currentStyle || window.getComputedStyle(children[index])
    let margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight)
    totalWidth += margin
    return totalWidth
  }

  componentDidUpdate(prevProps) {
    let isOverFlow =
      this.nodeRef && this.totalWidthOfChildrens > this.slideWidth()
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
        ref={node => {
          this.nodeRef = node
        }}
      >
        {isOverFlow && this.state.translateValue !== 0 && (
          <ArrowContainer direction="left">
            <Arrow direction="left" clickFunction={this.previousSlide} />
          </ArrowContainer>
        )}
        <Carousal>
          <div
            className={
              'elements-div' + (!isOverFlow ? ' content-not-overflow' : '')
            }
            style={{
              position: 'relative',
              left: `${this.state.translateValue}px`,
              transition: 'left ease-out 0.45s',
            }}
            data-testid="image-carousel"
          >
            {this.props.children}
          </div>
        </Carousal>
        {isOverFlow && this.state.showRightArrow && (
          <ArrowContainer direction="right">
            <Arrow direction="right" clickFunction={this.nextSlide} />
          </ArrowContainer>
        )}
      </StyledCarouselWrapper>
    )
  }
}

export default ImageSlideShowCarousel
