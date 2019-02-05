import React from 'react'
import styled from 'styled-components'
import NoImg from '../icons/NoImg'
import Link from 'next/link'
import CategoriesDetails from '../CategoriesDetails'
import Text from '../Text'

import { from } from '../../lib/Media'

const CategoryContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 9.5rem;
  grid-gap: 0.5rem;

  ${from('tablet')} {
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 0.5rem 1rem;
  }

  ${from('desktop')} {
    display: flex;
    flex-wrap: wrap;
    width: 59rem;
    margin: 0 auto;
  }

  ${from('uhd')} {
    width: unset;
    max-width: 90rem;
  }
`

const StyledCategory = styled.li`
  background-color: #ffffff;
  border: 1px solid ${({ selected }) => (selected ? '#1557bf' : '#eaeaea')};
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  text-transform: capitalize;

  ${from('desktop')} {
    width: 29rem;
    height: 19.25rem;
    border-radius: 4px;
    padding: 1rem 0.5rem 0.5rem 0.5rem;
    border: 1px solid #eaeaea;
    margin: 0.5rem 0;
    flex-basis: calc((100% - 1rem) / 2);

    :nth-child(4n + 1) {
      margin-right: 1rem;
    }
  }

  ${from('uhd')} {
    flex-basis: calc((100% - 2rem) / 3);

    :nth-child(4n + 1) {
      margin-right: 0;
    }

    :nth-child(1n + 1) {
      margin-right: 1rem;
    }

    :nth-child(6n + 11) {
      margin-right: 0;
    }

    :nth-child(5) {
      margin-right: 0;
    }
  }
`
const ImageHeading = styled.div`
  display: flex;
  flex-direction: column;

  ${from('desktop')} {
    flex-direction: row;
    align-items: center;
    padding-bottom: 1rem;
    padding-left: 1rem;
  }
`

const Heading = styled.div`
  display: flex;
  align-items: center;
  padding: 0.375rem 0.5rem;
  min-height: 3.6rem;
  overflow: hidden;

  ${from('desktop')} {
    flex-flow: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0.75rem 4px;
  }
`

const CategoryImage = styled.img`
  width: 100%;
`

const NoImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5.75rem;
  padding: 0.375rem 0.75rem;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255) 0,
    rgba(255, 255, 255) 65.22%,
    rgba(0, 0, 0, 0.05)
  );
  margin-top: 0.25rem;
  overflow: hidden;

  ${from('desktop')} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.5rem;
    height: 4.5rem;
    padding: 0;
    background-image: none;
  }
`

const CategoryHeading = styled(Text)`
  overflow: hidden;

  ${from('desktop')} {
    font-size: 1.125rem;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: #333333;
    margin-bottom: 4px;
  }
`
const CategorySubHeading = styled(CategoryHeading)`
  display: none;

  ${from('desktop')} {
    display: inline-block;
    font-size: 0.875rem;
    line-height: 1.43;
    color: #1557bf;
    margin-bottom: 0;
  }
`

const SubCategory = styled.ul`
  display: none;
  text-transform: capitalize;

  ${from('desktop')} {
    display: block;
    list-style-type: none;
    padding: 1rem 0.5rem 0 0.5rem;
    margin: 0 0.5rem;
    height: 12rem;
    border-top: 1px solid #eaeaea;
    column-count: 2;
    column-fill: auto;
    overflow: hidden;
  }
`
const SubCategoryItems = styled.li`
  margin-bottom: 1rem;
  text-transform: capitalize;
`
const SubCategoryItem = styled.a`
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #1557bf;
  text-transform: capitalize;
`

const customLink = (component, link) => {
  if (link && link.trim()) {
    return <Link href={link.trim()}>{component}</Link>
  } else {
    return component
  }
}

class CategoryContainerList extends React.Component {
  onClick = idx => this.setState({ selectedMenuIdx: idx })
  render() {
    let categoryCollection = this.props.data && this.props.data.category
    let selectedMenuIdx = this.state && this.state.selectedMenuIdx
    if (!categoryCollection || !categoryCollection.length) {
      return null
    }

    return (
      <CategoryContainer>
        {categoryCollection
          .filter(el => el.subCategories && el.subCategories.length)
          .map((el, index) => (
            <React.Fragment key={'category-' + index}>
              <StyledCategory
                onClick={() => this.onClick(index)}
                selected={selectedMenuIdx === index}
              >
                <ImageHeading>
                  {el.image ? (
                    <NoImage>
                      <CategoryImage
                        src={el.image}
                        alt={el.name}
                        data-testid="category-img"
                      />
                    </NoImage>
                  ) : (
                    <NoImage data-testid="no-img">
                      <NoImg />
                    </NoImage>
                  )}
                  <Heading>
                    <CategoryHeading
                      as="p"
                      size="small"
                      weight="bold"
                      color="#333333"
                    >
                      {el.name.toLowerCase()}
                    </CategoryHeading>
                    {customLink(
                      <CategorySubHeading>{`View all ${el.name.toLowerCase()}`}</CategorySubHeading>,
                      '/category/' + el.slug
                    )}
                  </Heading>
                </ImageHeading>
                <SubCategory>
                  {el.subCategories &&
                    el.subCategories.map(elements => (
                      <SubCategoryItems
                        key={'subcategory-' + index + elements.slug}
                      >
                        {customLink(
                          <SubCategoryItem>
                            {elements.name.toLowerCase()}
                          </SubCategoryItem>,
                          '/category/' + elements.slug
                        )}
                      </SubCategoryItems>
                    ))}
                </SubCategory>
              </StyledCategory>
              <CategoriesDetails
                subCategories={el}
                selected={selectedMenuIdx === index}
                index={index}
              />
            </React.Fragment>
          ))}
      </CategoryContainer>
    )
  }
}

CategoryContainerList.defaultProps = {
  data: [],
}

export default CategoryContainerList
