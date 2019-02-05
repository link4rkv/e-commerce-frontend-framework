import React, { Component } from 'react'
import styled from 'styled-components'
import Text from '../Text/Text'

const TableRow = styled.tr`
  padding: 0.5rem;
  height: 2rem;
  :nth-child(even) {
    background: #f3f5f7;
  }
  :nth-child(odd) {
    background: #ffffff;
  }
`

const TableData = styled.td`
  padding: 0.5rem;
`

const dummyData = {
  data: {
    0: ['key', 'value'],
    1: ['key', 'value'],
    2: ['key', 'value'],
    3: ['key', 'value'],
    4: ['key', 'value'],
  },
}
class Table extends Component {
  render() {
    return (
      <table>
        {Object.keys(dummyData.data).map((e, index) => {
          return (
            <TableRow key={e + index}>
              <TableData>
                <Text size="medium">{dummyData.data[e][0]}</Text>
              </TableData>
              <TableData>
                <Text size="medium">{dummyData.data[e][1]}</Text>
              </TableData>
            </TableRow>
          )
        })}
      </table>
    )
  }
}

export default Table
