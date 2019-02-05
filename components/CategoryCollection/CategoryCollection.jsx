import React, { Component } from 'react'
import { from } from '../../lib/Media'
import Carousel from '../Carousel'
import Link from 'next/link'
import styled from 'styled-components'
import NoImg from '../icons/NoImg'
import Text from '../Text'

const CategoryContainer = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`
const CategoryCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const PageHeading = styled(Text)`
  margin-bottom: 0.5rem;
  height: 1.5rem;

  ${from('tablet')} {
    font-size: 1.125rem;
    line-height: 1.33;
  }
`

const CategoryCard = styled.div`
  display: inline-block;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  overflow: hidden;
  background-color: #ffffff;
  flex-shrink: 0;
  margin-right: 0.5rem;
  width: 9.75rem;
  height: 9.75rem;

  ${from('tablet')} {
    width: 14rem;
    height: 13.0625rem;
    margin-right: 1rem;
  }
`

const CardImage = styled.img`
  width: 100%;
  height: 6.5rem;

  ${from('tablet')} {
    height: 9.3125rem;
  }
`
// const CardSubHeading = styled(Text)`
//   margin: 0 0.5rem 0.5rem 0.5rem;
// `

const CardHeading = styled(Text)`
  margin: 0.5rem 0.5rem 0 0.5rem;
  white-space: normal;
  overflow: hidden;

  ${from('tablet')} {
    margin: 0.75rem 0.75rem 0 0.75rem;
  }
`
// const CardSubHeading = styled(Text)`
//   margin: 0 0.5rem 0.5rem 0.5rem;
// `

const StyledA = styled.a`
  display: block;
  text-decoration: none;
`

const NoImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255) 0,
    rgba(255, 255, 255) 65.22%,
    rgba(0, 0, 0, 0.05)
  );
  overflow: hidden;
  height: 6.5rem;

  ${from('tablet')} {
    height: 9.3125rem;
  }
`

class CategoryCollection extends Component {
  render() {
    let title = this.props.data && this.props.data.title
    let collections = this.props.data && this.props.data.collection
    let config = this.props.config || {}
    return !collections ? null : (
      <CategoryContainer>
        <PageHeading size="large" weight="bold" color="#333333" title={title}>
          {title}
        </PageHeading>
        {config.layoutType === 'SCROLLER' ? (
          <Carousel hasMore={false} infiniteScrolling={false}>
            {collections &&
              collections.map((collection, index) => {
                return (
                  <CategoryCard
                    className={
                      'category' + (collection.category.image ? '' : ' no-img')
                    }
                    key={'category-' + index}
                  >
                    <Link
                      href={
                        collection.category.slug
                          ? `/category/${collection.category.slug}`
                          : '#'
                      }
                      passHref
                    >
                      <StyledA>
                        {collection.category.image ? (
                          <CardImage
                            src={collection.category.image}
                            alt={collection.category.name}
                          />
                        ) : (
                          <NoImgContainer>
                            <NoImg />
                          </NoImgContainer>
                        )}
                        <CardHeading
                          as="h2"
                          size="medium"
                          color="#333333"
                          weight="bold"
                        >
                          {collection.category.name}
                        </CardHeading>
                        {/* <CardSubHeading as='h5' size='small' weight='bold' color='#696969'>Till 29 Nov 2018</CardSubHeading> */}
                      </StyledA>
                    </Link>
                  </CategoryCard>
                )
              })}
          </Carousel>
        ) : (
          <CategoryCardContainer>
            {collections &&
              collections.map((collection, index) => {
                return (
                  <CategoryCard
                    className={
                      'category' + (collection.category.image ? '' : ' no-img')
                    }
                    key={'category-' + index}
                  >
                    <Link
                      href={
                        collection.category.slug
                          ? `/category/${collection.category.slug}`
                          : '#'
                      }
                      passHref
                    >
                      <StyledA>
                        {collection.category.image ? (
                          <CardImage
                            src={collection.category.image}
                            alt={collection.category.name}
                            className={collection.category.image}
                          />
                        ) : (
                          <NoImgContainer>
                            <NoImg height="9.7rem" width="50%" />
                          </NoImgContainer>
                        )}
                        <CardHeading
                          as="h2"
                          size="medium"
                          color="#333333"
                          weight="bold"
                        >
                          {collection.category.name}
                        </CardHeading>
                      </StyledA>
                    </Link>
                  </CategoryCard>
                )
              })}
          </CategoryCardContainer>
        )}
      </CategoryContainer>
    )
  }
}

export default CategoryCollection
