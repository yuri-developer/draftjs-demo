'use client'
import { TextEditor } from '@/components/TextEditor'
import { Box } from '@chakra-ui/react'

export default function Page() {
  return (
    <Box m={'10%'}>
      <TextEditor title='Rich Text Editor' />
    </Box>
  )
}
