import Quill from 'quill'
import { useEffect, useRef } from 'react'
import { QuillBinding } from 'y-quill'
import type * as Y from 'yjs'
import s from './Editor.module.css'
import 'quill/dist/quill.snow.css'

type EditorProps = {
  yText?: Y.Text
}

const Editor: React.FC<EditorProps> = ({ yText }) => {
  const containerRef = useRef(null)
  const quillRef = useRef<Quill>(null)

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return
    quillRef.current = new Quill(containerRef.current, {
      modules: {
        toolbar: [
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
          ],
          [{ list: 'bullet' }, { list: 'ordered' }, { list: 'check' }],
        ],
        history: {
          userOnly: true, // Local undo shouldn't undo changes from remote users
        },
      },
      theme: 'snow',
    })
    quillRef.current?.disable()
  }, [containerRef])

  useEffect(() => {
    if (yText) {
      const binding = new QuillBinding(yText, quillRef.current)
      quillRef.current?.enable()
      return () => {
        binding.destroy()
        quillRef.current?.disable()
      }
    }
  }, [yText])

  return (
    <div className={s.root}>
      <div ref={containerRef}></div>
    </div>
  )
}

export default Editor
