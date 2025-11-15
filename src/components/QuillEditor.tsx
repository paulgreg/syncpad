import Quill from 'quill'
import { useEffect, useRef } from 'react'
import { QuillBinding } from 'y-quill'
import type * as Y from 'yjs'
import s from './QuillEditor.module.css'
import 'quill/dist/quill.bubble.css'

type QuillEditorProps = {
  yText?: Y.Text
}

const QuillEditor: React.FC<QuillEditorProps> = ({ yText }) => {
  const containerRef = useRef(null)
  const quillRef = useRef<Quill>(null)

  const imageHandler = () => {
    if (!quillRef?.current) return
    const range = quillRef.current.getSelection()
    if (!range) return
    const value = prompt('Inert the image url here', 'https://...')
    if (value) {
      quillRef.current.insertEmbed(
        range.index,
        'image',
        value,
        Quill.sources.USER
      )
    }
  }

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return
    quillRef.current = new Quill(containerRef.current, {
      modules: {
        toolbar: {
          container: [
            [
              { header: [false, 1, 2, 3, 4] },
              { size: ['small', false, 'large'] },
            ],
            [{ align: [] }, { color: [] }, { background: [] }],
            [
              'bold',
              'italic',
              'underline',
              'strike',
              'blockquote',
              'code-block',
              'link',
              'image',
            ],
            [{ list: 'bullet' }, { list: 'ordered' }, { list: 'check' }],
          ],
          handlers: {
            image: imageHandler,
          },
        },
        history: {
          userOnly: true, // Local undo shouldn't undo changes from remote users
        },
      },
      theme: 'bubble',
    })
    quillRef.current?.disable()
  }, [containerRef])

  useEffect(() => {
    if (!yText) return
    const binding = new QuillBinding(yText, quillRef.current)
    quillRef.current?.enable()
    return () => {
      binding.destroy()
      quillRef.current?.disable()
    }
  }, [yText])

  return (
    <div className={s.root}>
      <div ref={containerRef}></div>
    </div>
  )
}

export default QuillEditor
