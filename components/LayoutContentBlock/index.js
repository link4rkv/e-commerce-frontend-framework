import React from 'react'
import Text from '../Text/Text'

const LayoutContentBlock = props => {
  return (
    <p>
      {props.data && props.data.text && (
        <Text size="medium" color="#333" data-testid="LayoutText">
          {props.data.text}
        </Text>
      )}
    </p>
  )
}

export default LayoutContentBlock
