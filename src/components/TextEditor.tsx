import { convertToRaw, EditorState } from 'draft-js'
import type { FC } from 'react'
import { useState } from 'react'

import { Box, Button, Heading, Textarea } from '@chakra-ui/react'

import 'draft-js/dist/Draft.css'
import draftToHtml from 'draftjs-to-html'
import dynamic from 'next/dynamic'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

type TProps = {
  title?: string
}

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
})

export const TextEditor: FC<TProps> = ({ title }) => {
  const [isFocused, setFocused] = useState<boolean>(false)
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const [htmlContent, setHtmlContent] = useState<string>('')

  const contentState = editorState.getCurrentContent()

  const onEditorStateChange = (newEditorState: EditorState): void => {
    setEditorState(newEditorState)
    const rawContentState = convertToRaw(newEditorState.getCurrentContent())
    const html = draftToHtml(rawContentState)
    setHtmlContent(html)
  }

  const handleChangeBlur = () => {
    setFocused((prevState: boolean) => (prevState ? false : prevState))
  }

  const handleChangeFocus = () => {
    setFocused((prevState: boolean) => (prevState ? true : !prevState))
  }

  const logEditorState = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const html = draftToHtml(rawContentState)
    setHtmlContent(html)
  }

  return (
    <Box>
      <Heading as={'h2'}>{title}</Heading>
      <Box
        h={'full'}
        minH={'100px'}
        border={isFocused || contentState.hasText() ? '2px' : '1px'}
        borderColor={isFocused || contentState.hasText() ? 'black' : 'gray'}
        borderRadius={'10px'}
        onClick={handleChangeFocus}
        p={'10px'}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          onBlur={handleChangeBlur}
          placeholder='Tell a story...'
        />
        <Button onClick={logEditorState}>Log Editor State</Button>
        <Textarea
          mt={4}
          value={htmlContent}
          _hover={{
            borderColor: 'black',
          }}
          readOnly
        />
      </Box>
    </Box>
  )
}
