import sCommon from './CommonPage.module.css'
import Editor from '../components/Editor'
import { useNavigate, useParams } from 'react-router-dom'
import { useDataContext } from '../DataContext'
import Title from '../components/Title'
import Icon from '../components/Icon'
import { useCallback } from 'react'

const EditorPage = () => {
  const { yText, pages, addPage } = useDataContext()
  const { guid } = useParams()
  const navigate = useNavigate()

  if (!guid) navigate('/')

  const onAddClick = useCallback(() => {
    const newIndex = addPage()
    navigate(`/editor/${guid}/${newIndex}`)
  }, [addPage, guid, navigate])

  return (
    <div>
      <header className={sCommon.header}>
        <Title />
        <a href={`/list/${guid}`} title="list view">
          <button disabled={(pages?.length ?? 0) === 0}>
            <Icon icon="list" />
          </button>
        </a>
        <button title="add a page" onClick={onAddClick}>
          <Icon icon="plus" />
        </button>
        <a href="/" title="back to home">
          <button>
            <Icon icon="home" />
          </button>
        </a>
      </header>
      <main>
        <Editor yText={yText} />
      </main>
    </div>
  )
}

export default EditorPage
