import styled from 'styled-components'
import {
  space,
  SpaceProps,
  layout,
  LayoutProps,
  color,
  ColorProps
} from 'styled-system'

type BoxProps = SpaceProps & LayoutProps & ColorProps

export const Box = styled.div<BoxProps>`
  ${space}
  ${layout}
  ${color}
`
