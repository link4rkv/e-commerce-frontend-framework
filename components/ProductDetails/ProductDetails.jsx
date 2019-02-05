import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import CartCounter from './../CartCounter'
import { CartConsumer } from './../CartProvider'
import { WishlistConsumer } from './../WishlistProvider'
import SvgBack from '../icons/Back'
import Share from '../icons/Share'
import FavouriteInactive from '../icons/FavouriteInactive'
import FavouriteActiveIcon from '../icons/FavouriteActive'
import PromoOffers from '../PromoOffer/PromoOffer'
import PriceDetails from './PriceDetails'
import Carousel from '../Carousel'
import ProductDescription from '../ProductDescription'
import NoImg from '../icons/NoImg'
import ProductCollection from '../ProductCollection'
import { from, only } from './../../lib/Media'
import ImageSlideShow from '../ImageSlideShow/ImageSlideShow'

const ProductDetailsPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  > div:not(:last-child) {
    margin-bottom: 2rem;
  }
`

const IconContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  ${from('hd')} {
    padding: 1rem 0 0.5rem 3.5rem;
  }
  ${only('desktop')} {
    padding: 2rem 0 0.5rem 2.5rem;
  }
  ${only('tablet')} {
    padding: 2rem 0 0.5rem 2rem;
  }
  ${only('mobile')} {
    padding: 1rem 0 0 1rem;
  }
`

const IconDiv = styled.div`
  display: flex;
  cursor: ${props => (props.pointer ? 'pointer' : 'auto')};
  align-items: center;
  > div:not(:last-child) {
    margin-right: 1rem;
  }
  > a {
    text-decoration: none;
  }
  ${from('hd')} {
    > div:last-child {
      margin-right: 3.5rem;
    }
  }
  ${only('desktop')} {
    > div:last-child {
      margin-right: 2.5rem;
    }
  }
  ${only('tablet')} {
    > div:last-child {
      margin-right: 2rem;
    }
  }
  ${only('mobile')} {
    > div:last-child {
      margin-right: 1rem;
    }
  }
`

const ImageAndDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    margin: 0 0 1rem 0;
  }
  background-color: white;
  ${from('tablet')} {
    display: flex;
    flex-direction: row;
    > div:nth-child(1) {
      min-width: 19.75rem;
      margin: 0 2rem 0 0;
      max-width: 35%;
    }
    > div:nth-child(3) {
      margin: 0 2rem 0 0;
      flex: 1;
    }
  }
  ${from('desktop')} {
    > div:nth-child(1) {
      min-width: 21.5rem;
    }
  }
  ${from('hd')} {
    > div:nth-child(1) {
      min-width: 25rem;
    }
  }

  ${from('hd')} {
    padding: 0.5rem 0 2.5rem 3.5rem;
  }
  ${only('desktop')} {
    padding: 0.5rem 0 2rem 2.5rem;
  }
  ${only('tablet')} {
    padding: 0.5rem 0 2rem 2rem;
  }
  ${only('mobile')} {
    padding: 0 1rem 0.5rem 1rem;
  }
`

const ImgAndCarouselDiv = styled.div`
  ${only('mobile')} {
    display: none;
  }

  ${from('hd')} {
    display: flex;
    margin-right: 9rem !important;
  }
`

const CarouselDiv = styled.div`
  margin: 0.625rem 0 0 0;
  ${from('hd')} {
    height: 21.5rem;
    margin-top: 0rem !important;
    margin-left: 0.5rem;
    overflow-y: auto;
    overflow-x: visible;
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: 0;
  }
`

const ImgDiv = styled.div`
  width: 21.5rem;
  height: 21.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  ${from('mobile')} {
    width: 100%;
  }
`

const Img = styled.img`
  object-fit: fill;
  max-width: 100%;
  height: 100%;
  ${only('mobile')} {
    object-fit: fill;
  }
`
const DetailsDiv = styled.div`
  display: inline-block;
  max-width: 100%;
  > div {
    margin-bottom: 1rem;
  }
  ${only('mobile')} {
    padding-top: 0.875rem;
  }
`

const CounterFixed = styled.div`
  display: flex;
  ${only('mobile')} {
    position: fixed;
    bottom: 2%;
    right: 1rem;
    z-index: 998;
  }
`

const Div = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  border: 0.0625rem solid ${props => (props.selected ? '#1557bf' : '#eaeaea')};
  border-radius: 0.125rem;
  display: inline-block;
  overflow: hidden;
  margin-right: 0.625rem;
  align-items: center;
  cursor: pointer;

  ${from('hd')} {
    display: flex;
    margin-bottom: 0.625rem;
    margin-top: 0rem !important;
  }
`

const ProductDescriptionContainer = styled.div`
  display: flex;
  background-color: white;
  flex-wrap: wrap;
  ${from('tablet')} {
    flex-direction: row;
    > div {
      width: 45%;
      border-bottom: 0.25rem solid #eaeaea;
    }
    > div:nth-last-of-type(-n + 2):not(:nth-child(even)),
    div:last-child {
      border-bottom: 0rem;
    }
  }
  ${only('mobile')} {
    display: flex;
    flex-direction: column;
    > div:not(:last-child) {
      border-bottom: 0.25rem solid #eaeaea;
    }
  }
`

const PromoOfferContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  > div {
    width: 100%;
    margin: 0.5rem 1rem 0.5rem 0;
  }
  ${only('mobile')} {
    > div {
      margin-right: 0rem;
    }
  }
  ${from('desktop')} {
    > div {
      width: 45%;
    }
  }
`

const SidePaddingDiv = styled.div`
  margin-bottom: 0rem !important;
  ${from('hd')} {
    padding-left: 3.5rem;
  }
  ${only('desktop')} {
    padding-left: 2.5rem;
  }
  ${only('tablet')} {
    padding-left: 2rem;
  }
  ${only('mobile')} {
    padding-left: 1rem;
  }
`

let tempData = {
  config: {
    dots: {
      display: true,
      align: 'right',
      paddingSide: 'padding-right',
      paddingValue: '0.5rem',
      activeColor: '#000000',
      inActiveColor: ' #f3f5f7',
      height: '0.375rem',
      width: '0.375rem',
    },
    arrow: {
      hide: true,
    },
  },
}

//  temp data for image slide show config

const ImageSlideShowDiv = styled.div`
  height: 17.5rem;
  ${from('tablet')} {
    display: none;
  }
`

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImageIndex: 0,
    }
  }

  render() {
    const { product, similar } = this.props.data
    const page = product && product.data && product.data.page
    const layouts = page && page.layouts[0]
    const { item, description, images, name, storeSpecificData } =
      layouts && layouts.value
    const similarProducts = {
      collection: {
        product:
          similar.data.product && item
            ? similar.data.product.filter(prod => prod.item.id !== item.id)
            : similar.data.product,
        count: similar.data.count,
      },
    }
    const details = layouts.value
    const mapImageUrl =
      images &&
      images.map(ele => {
        return {
          imageUrl: ele,
        }
      })
    const DataForImageSlideShow = {
      images: mapImageUrl || [],
    }
    let currency = this.props.data.organizationData.currency
    let dataForPriceDetails = [
      {
        ...storeSpecificData[0],
        currency,
      },
    ]
    return (
      <CartConsumer>
        {({ update, countOf }) => (
          <WishlistConsumer>
            {wishlistConsumer => (
              <ProductDetailsPreviewContainer>
                <div>
                  <IconContainer>
                    <IconDiv>
                      <Link href="/browse">
                        <a>
                          <SvgBack width="22" height="22" />
                        </a>
                      </Link>
                    </IconDiv>
                    <IconDiv pointer>
                      <div
                        onClick={e => {
                          e.preventDefault()
                          wishlistConsumer.update(details)
                        }}
                      >
                        {wishlistConsumer.includes(details) ? (
                          <FavouriteActiveIcon width="22" height="22" />
                        ) : (
                          <FavouriteInactive width="22" height="22" />
                        )}
                      </div>
                      <div>
                        <Share width="22" height="18" />
                      </div>
                    </IconDiv>
                  </IconContainer>
                  <ImageAndDetailsContainer>
                    <ImgAndCarouselDiv>
                      <ImgDiv>
                        {images ? (
                          <Img
                            src={images[this.state.selectedImageIndex]}
                            alt="Product-image"
                          />
                        ) : (
                          <NoImg />
                        )}
                      </ImgDiv>
                      <CarouselDiv>
                        <Carousel
                          hasMore={false}
                          infiniteScrolling={false}
                          hideArrow
                        >
                          {Array.isArray(images) &&
                            images.map((element, index) => (
                              <Div
                                key={element + index}
                                onClick={() =>
                                  this.setState({ selectedImageIndex: index })
                                }
                                selected={
                                  index === this.state.selectedImageIndex
                                }
                              >
                                <Img src={element} alt="Product-image" />
                              </Div>
                            ))}
                        </Carousel>
                      </CarouselDiv>
                    </ImgAndCarouselDiv>
                    <ImageSlideShowDiv>
                      <ImageSlideShow
                        data={DataForImageSlideShow}
                        config={tempData.config}
                        stopAutoScroll
                        clickLessImageSlideShow
                      />
                    </ImageSlideShowDiv>
                    <DetailsDiv>
                      <PriceDetails
                        data={dataForPriceDetails}
                        name={name}
                        subName=""
                      />
                      <CounterFixed>
                        <CartCounter
                          key={`${details.id}-${countOf(details)}`}
                          defaultValue={countOf(details)}
                          onValueChange={({ delta }) => update(details, delta)}
                          name={'Add to cart'}
                          buttonType="capsule"
                          paddedName={true}
                          width="11.5rem"
                          customize={{
                            counter: {
                              height: '3.5rem',
                              width: '12rem',
                              background: '#ffffff',
                              boxShadow: '0 13px 15px 0 rgba(0, 0, 0, 0.12)',
                            },
                            button: {
                              height: '3.5rem',
                              width: '3.5rem',
                            },
                          }}
                        />
                      </CounterFixed>
                      <PromoOfferContainer>
                        <PromoOffers />
                        <PromoOffers />
                        <PromoOffers />
                      </PromoOfferContainer>
                    </DetailsDiv>
                  </ImageAndDetailsContainer>
                </div>
                {similarProducts && (
                  <SidePaddingDiv>
                    <ProductCollection
                      data={similarProducts}
                      type="compact"
                      hideSeeAllButton
                    />
                  </SidePaddingDiv>
                )}
                {description && (
                  <ProductDescriptionContainer>
                    <ProductDescription
                      title="Description"
                      data={description}
                    />
                  </ProductDescriptionContainer>
                )}
                {similarProducts && (
                  <SidePaddingDiv>
                    <ProductCollection
                      data={{ ...similarProducts, title: 'Similar Product' }}
                      hideSeeAllButton
                    />
                  </SidePaddingDiv>
                )}
              </ProductDetailsPreviewContainer>
            )}
          </WishlistConsumer>
        )}
      </CartConsumer>
    )
  }
}

export default ProductDetails
