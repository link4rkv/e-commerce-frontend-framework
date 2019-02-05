import React from 'react'
import styled from 'styled-components'
import fetch from 'isomorphic-unfetch'

import getConfig from 'next/config'

import Layout from '../../components/Layout'
import { only, from } from '../../lib/Media'
import Brands from '../../components/Brands/Brands'
import BookMarkBar from '../../components/Brands/BookMarkBar'
import Link from 'next/link'
import Text from '../../components/Text/Text'

const A_CHARCODE = 65
const Z_CHARCODE = 90

const ChangeButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  ${from('tablet')} {
    margin-bottom: 2rem;
  }

  ${from('desktop')} {
    margin-bottom: 1rem;
  }
`
const ButtonHeading = styled.div`
  letter-spacing: 1px;
  color: #696969;
`

const Buttons = styled.div`
  display: flex;
  margin-top: 0.5rem;
`
const CategoryButton = styled.div`
  height: 2.25rem;
  line-height: 2.25rem;
  padding: 0 1rem;
  color: #1557bf;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: #fff;
`
const BrandButton = styled.div`
  height: 2.25rem;
  line-height: 2.25rem;
  padding: 0 1rem;
  color: #fff;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: #1557bf;
`

const StyledBookMarBar = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  ${only('mobile')} {
    position: fixed;
    top: 9.3rem;
    right: 1rem;
  }
  ${only('tablet')} {
    position: fixed;
    top: 16.25rem;
    right: 2rem;
  }
  ${from('desktop')} {
    justify-content: center;
  }
`

const {
  publicRuntimeConfig: { API_URL },
} = getConfig()

class Categories extends React.Component {
  static async getInitialProps() {
    const brands = await (await fetch(
      `${API_URL}/brand?paginated=false&paginate=false`
    )).json()
    return { brands }
  }

  render() {
    const { organizationData } = this.props
    const brands = this.props.brands && this.props.brands.data.brand

    const groupByAlphabet = brands.reduce((op, cur) => {
      const FirstCharacter = cur.name[0].toUpperCase()
      const FirstCharacterCode = FirstCharacter.charCodeAt()
      if (
        A_CHARCODE <= FirstCharacterCode &&
        FirstCharacterCode <= Z_CHARCODE
      ) {
        if (op[FirstCharacter]) {
          op[FirstCharacter].push(cur)
        } else {
          op[FirstCharacter] = [cur]
        }
      } else if (!isNaN(FirstCharacterCode)) {
        if (op['#']) {
          op['#'].push(cur)
        } else {
          op['#'] = [cur]
        }
      } else {
        if (op['special']) {
          op['special'].push(cur)
        } else {
          op['special'] = [cur]
        }
      }
      return op
    }, {})
    const keys = [...ALPHABETS, '#', 'special']
    const finalDataForBrands = keys.reduce((output, current) => {
      if (groupByAlphabet[current]) {
        if (current !== 'special') {
          const sorted = [...groupByAlphabet[current]].sort((a, b) =>
            a.name.toUpperCase().localeCompare(b.name.toUpperCase())
          )
          output[current] = sorted
        } else {
          ;(output['#'] || []).push(output[current])
        }
      }
      return output
    }, {})
    return (
      <Layout organizationData={organizationData}>
        <ChangeButton>
          <ButtonHeading>
            <Text size="small" weight="black">
              BROWSE BY
            </Text>
          </ButtonHeading>
          <Buttons>
            <Link href="/categories">
              <CategoryButton>
                <Text size="medium">Category</Text>
              </CategoryButton>
            </Link>
            <BrandButton>
              <Text size="medium" weight="bold">
                Brand
              </Text>
            </BrandButton>
            <StyledBookMarBar>
              <BookMarkBar data={finalDataForBrands} />
            </StyledBookMarBar>
          </Buttons>
        </ChangeButton>
        <Brands data={finalDataForBrands} />
      </Layout>
    )
  }
}

export default Categories
export const ALPHABETS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '#',
]
