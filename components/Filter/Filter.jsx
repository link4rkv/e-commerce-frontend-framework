import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Block, Button, Backdrop, Sidebar } from 'reakit'
import FilterList from './FilterList'
import FilterInactive from '../icons/FilterInactive'
import { only, from } from '../../lib/Media'
import Text from '../Text/Text'

const StyledSidebar = styled(Sidebar)`
  display: block;
  background-color: #ffffff;
  > :not(:last-child) {
    border-bottom: 0.025rem solid #eaeaea;
  }
  ${only('tablet')} {
    position: fixed;
    top: 8.125rem;
  }
  ${from('desktop')} {
    position: relative;
  }
`
const StyledBackdrop = styled(Backdrop)`
  background-color: #f3f5f7;
  opacity: 0.9;
  ${only('tablet')} {
    position: fixed;
    top: 8.125rem;
  }
`
const FilterCategoryContainer = styled.div`
  width: 15.5rem;
  display: flex;
  flex-direction: column;
`

const HeadingContainer = styled.div`
  display: flex;
  padding: 1.5rem 1.125rem 1.125rem 1.125rem;
  justify-content: space-between;
`

const Heading = styled.h1`
  color: ${props => (props.color ? props.color : '#000000')};
  cursor: ${props => (props.cursor ? props.cursor : 'unset')};
`

const FilterButtonDiv = styled.div`
  display: flex;
  width: ${({ variant }) => (variant === 'sitemap' ? 'auto' : '6.25rem')};
  height: ${({ variant }) => (variant === 'sitemap' ? 'auto' : '3.5rem')};
  background-color: white;
  align-items: center;
  padding: ${({ variant }) =>
    variant === 'sitemap' ? '0.625rem 0.2rem 0.625rem 0.625rem' : '1rem'};
  margin-right: 0.5rem;
  cursor: pointer;
  border-radius: ${({ variant }) => (variant === 'sitemap' ? '50%' : '0')};
`

const StyledFilterInactive = styled(FilterInactive)`
  margin-right: 0.375rem;
`

const FilterForMobileAndTablet = styled.div`
  ${from('desktop')} {
    display: none;
  }
`

const FilterForDesktopAndHd = styled.div`
  display: none;
  ${from('desktop')} {
    display: block;
    background: #ffffff;
    height: 100%;
    > div:not(:last-child) {
      border-bottom: 0.025rem solid #eaeaea;
    }
  }
`

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedFilters: [],
      data: this.props.data,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleSidebar = this.handleSidebar.bind(this)
  }

  handleClear() {
    let temp = Object.assign({}, this.state.data)
    Object.keys(temp).forEach(element => {
      temp[element].forEach(el => {
        el.checked = false
      })
    })
    this.setState({
      checkedFilters: [],
      data: temp,
    })
  }
  handleClick(e, param) {
    const temp = Object.assign({}, this.state.data)
    const group = [...temp[param.group]]
    const changedGroup = group.map(element => {
      if (element.label === param.label) element.checked = !element.checked
      return element
    })
    this.setState({
      data: {
        ...this.state.data,
        [param.group]: changedGroup,
      },
    })
  }

  handleSidebar(sidebar) {
    if (sidebar.visible) {
      document.body.style.overflow = 'auto'
    } else {
      window.scrollTo(0, 0)
      document.body.style.overflow = 'hidden'
    }
  }

  render() {
    let { variant } = this.props
    return (
      <Fragment>
        <FilterForMobileAndTablet>
          <Sidebar.Container>
            {sidebar => (
              <Block>
                <Button
                  as={Sidebar.Show}
                  {...sidebar}
                  onClick={() => this.handleSidebar(sidebar)}
                >
                  <FilterButtonDiv variant={variant}>
                    <StyledFilterInactive />
                    {variant !== 'sitemap' && <Text size="large">Filter</Text>}
                  </FilterButtonDiv>
                </Button>
                <StyledBackdrop
                  fade
                  {...sidebar}
                  onClick={() => this.handleSidebar(sidebar)}
                />
                <StyledSidebar slide hideOnClickOutside {...sidebar}>
                  {Object.keys(this.props.data).map((element, id) => {
                    return (
                      <FilterCategoryContainer key={element + id}>
                        <HeadingContainer>
                          <Heading>
                            <Text size="large" weight="bold">
                              {element}
                            </Text>
                          </Heading>
                          {id === 0 && (
                            <Heading
                              onClick={this.handleClear}
                              color="#dd0d42"
                              cursor="pointer"
                            >
                              <Text size="large" weight="bold">
                                Clear all filters
                              </Text>
                            </Heading>
                          )}
                        </HeadingContainer>
                        <FilterList
                          data={this.props.data[element]}
                          onClick={this.handleClick}
                          checkedFilters={this.state.checkedFilters}
                        />
                      </FilterCategoryContainer>
                    )
                  })}
                </StyledSidebar>
              </Block>
            )}
          </Sidebar.Container>
        </FilterForMobileAndTablet>
        <FilterForDesktopAndHd>
          {Object.keys(this.props.data).map((element, id) => {
            return (
              <FilterCategoryContainer key={element + id}>
                <HeadingContainer>
                  <Heading>
                    <Text size="large" weight="bold">
                      {element}
                    </Text>
                  </Heading>
                  {id === 0 && (
                    <Heading
                      onClick={this.handleClear}
                      color="#dd0d42"
                      cursor="pointer"
                    >
                      <Text size="large" weight="bold">
                        Clear all filters
                      </Text>
                    </Heading>
                  )}
                </HeadingContainer>
                <FilterList
                  data={this.props.data[element]}
                  onClick={this.handleClick}
                  checkedFilters={this.state.checkedFilters}
                />
              </FilterCategoryContainer>
            )
          })}
        </FilterForDesktopAndHd>
      </Fragment>
    )
  }
}

export default Filter
