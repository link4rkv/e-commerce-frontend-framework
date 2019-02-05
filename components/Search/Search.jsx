import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import fetch from 'isomorphic-unfetch'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { Router, Link } from '../../routes'
import { createGlobalStyle } from 'styled-components'

import { from } from '../../lib/Media'
import GlobalContext from '../../components/GlobalContext'
import { store } from '../CartProvider'

import SearchIcon from '../icons/Search'
import RemoveIcon from '../icons/Remove'
import Loader from '../Loader'
import Text from '../Text'

const GlobalStyle = createGlobalStyle`
  body {
    overflow: ${({ hide }) => (hide ? 'hidden' : 'auto')};
    position: ${({ hide }) => (hide ? 'relative' : 'static')};
  }
`

const StyledContainer = styled.div`
  position: relative;

  ${from('tablet')} {
    margin-left: 1rem;
    margin-right: 1rem;
    flex: 1;
  }
`

const StyledSubmit = styled.button`
  display: none;
`

const Input = styled.input`
  border: 1px solid #eaeaea;
  width: 100%;
  font-size: 0.875rem;
  background-color: #f3f5f7;
  border-radius: 1.25rem;
  line-height: 1.43;
  padding: 0.625rem 0.625rem 0.625rem 2.25rem;
  outline: none;

  ::placeholder {
    color: #696969;
  }
`

const ClearIcon = styled(RemoveIcon)`
  position: absolute;
  right: 0.7rem;
  top: 0.9rem;
`

const StyledIcon = styled(SearchIcon)`
  position: absolute;
  left: 1rem;
  top: 0.75rem;

  color: #1557bf;
`
const SearchResult = styled.div`
  position: fixed;
  z-index: 3;
  top: 8.2rem;
  left: 0;
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;

  ${from('tablet')} {
    position: absolute;
    top: calc(100% + 0.5rem);
    border: 1px solid #eaeaea;
    border-radius: 4px;
    box-shadow: 0 13px 15px 0 rgba(0, 0, 0, 0.12);
  }
`
const SearchResultHeading = styled.h3`
  color: #696969;
  font-size: 0.85rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-weight: 700;
`

const AllResult = styled.div`
  padding: 1rem 0;
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
`

const StyledA = styled.a`
  display: block;
  text-decoration: none;
  color: #1557bf;
`
const StyledRecentSearchContainer = styled.div`
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 1rem;
`

const StyledRecentSearchHeader = styled.h3`
  font-weight: bold;
  color: #696969;
  font-size: 0.85rem;
  line-height: 1rem;
  text-transform: uppercase;
`

const StyledRecentSearchTerm = styled.a`
  color: #1557bf;
  line-height: 1.2rem;
  padding: 0.5rem 0;
  display: block;
  text-decoration: none;
  text-transform: capitalize;
`

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      term: props.router.query.query || '',
      recentSearches: [],
    }

    this.search = debounce(this.search.bind(this), 300)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateRecentSearches = this.updateRecentSearches.bind(this)
  }

  search(term) {
    if (term) {
      this.setState({ loading: true }, async () => {
        try {
          const params = {
            storeId: this.props.checkoutAddress.storeId,
            q: term,
          }
          let url = new URL(`${this.props.url}/product`)
          url.search = new URLSearchParams(params)
          const resp = await fetch(url)
          const results = await resp.json()
          this.setState({
            results: results.data.product.filter(
              item => item.storeSpecificData && item.storeSpecificData.length
            ),
            loading: false,
            error: null,
          })
        } catch (error) {
          this.setState({ error: error.message, loading: false })
        }
      })
    }
  }

  handleChange(value) {
    if (value.startsWith(' ')) {
      value = value.trim()
    }
    this.setState(
      prevState => {
        let newState = Object.assign({}, prevState)

        newState.term = value
        if (value === '') {
          newState.results = []
        }

        return newState
      },
      () => this.search(value)
    )
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.term) {
      this.setState({ results: '' }, () =>
        Router.pushRoute(`/search?query=${this.state.term}`)
      )
    }
  }

  updateRecentSearches(term) {
    const RECENT_SEARCH_TERM_COUNT = 3 // max number of recent search terms
    let { recentSearches } = this.state
    let newRecentSearches = !isEmpty(recentSearches)
      ? JSON.parse(JSON.stringify(recentSearches))
      : [term]
    if (!newRecentSearches.includes(term)) {
      newRecentSearches.unshift(term)
    }
    newRecentSearches = newRecentSearches.slice(0, RECENT_SEARCH_TERM_COUNT)
    if (!isEqual(newRecentSearches, recentSearches)) {
      this.setState({ recentSearches: newRecentSearches })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.state.recentSearches, prevState.recentSearches)) {
      localStorage.setItem('search', JSON.stringify(this.state.recentSearches))
    }
    if (this.props.router.query.query !== prevProps.router.query.query) {
      this.updateRecentSearches(this.props.router.query.query)
    }
  }

  componentDidMount() {
    let recentSearches = store('search')()
    let term = this.props.router.query.query
    if (!Array.isArray(recentSearches)) {
      recentSearches = []
    }
    if (term && !recentSearches.includes(term)) {
      this.setState({ recentSearches: [term, ...recentSearches] })
    } else {
      this.setState({ recentSearches })
    }
  }

  render() {
    const { className, renderResults } = this.props
    const { term, results, loading, recentSearches } = this.state

    return (
      <StyledContainer>
        <form
          data-testid="search-form"
          className={className}
          action="/search"
          method="GET"
          onSubmit={this.handleSubmit}
        >
          <label>
            <StyledIcon title="Search" />
            <Input
              onChange={event => this.handleChange(event.target.value)}
              placeholder="I am looking for..."
              type="text"
              name="query"
              value={term}
              autoComplete="off"
            />
            {term && (
              <ClearIcon
                onClick={() => this.setState({ term: '', results: '' })}
              />
            )}
          </label>
          <StyledSubmit type="submit">Search</StyledSubmit>
        </form>
        {(results || loading) && (
          <React.Fragment>
            <GlobalStyle hide={true} />
            <SearchResult>
              {recentSearches && recentSearches.length > 0 && (
                <StyledRecentSearchContainer>
                  <StyledRecentSearchHeader>
                    Recent Search
                  </StyledRecentSearchHeader>
                  {recentSearches.map(term => (
                    <Link href={`/search?query=${term}`} passHref key={term}>
                      <StyledRecentSearchTerm>{term}</StyledRecentSearchTerm>
                    </Link>
                  ))}
                </StyledRecentSearchContainer>
              )}
              {loading ? (
                <React.Fragment>
                  <SearchResultHeading>Suggested Products</SearchResultHeading>
                  <Loader />
                </React.Fragment>
              ) : results.length ? (
                <React.Fragment>
                  <SearchResultHeading>Suggested Products</SearchResultHeading>
                  {renderResults(results)}
                </React.Fragment>
              ) : (
                <Text color="#333333" size="large">
                  No product found
                </Text>
              )}
              {results && results.length > 0 && !loading && (
                <AllResult>
                  <Link href={`/search?query=${term}`} passHref>
                    <StyledA>View all results for &ldquo;{term}&rdquo;</StyledA>
                  </Link>
                </AllResult>
              )}
            </SearchResult>
          </React.Fragment>
        )}
      </StyledContainer>
    )
  }
}

Search.defaultProps = {
  onChange: () => {},
  renderResults: () => null,
}

export default withRouter(props => (
  <GlobalContext.Consumer>
    {({ API_URL }) => <Search {...props} url={API_URL} />}
  </GlobalContext.Consumer>
))
