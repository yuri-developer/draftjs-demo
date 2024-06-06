import { extendTheme } from '@chakra-ui/react'

import { globalStyles } from './globals'

const fonts = { body: "'Montserrat', sans-serif", mono: "'Menlo', monospace" }

const theme = extendTheme({
  color: {
    black: '#000',
    white: '#fff',
    gray: '#718096',
  },
  fonts,
  styles: {
    global: globalStyles,
  },
})

export default theme
