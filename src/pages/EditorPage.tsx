import sCommon from './CommonPage.module.css'
import QuillEditor from '../components/QuillEditor'
import { useNavigate, useParams } from 'react-router-dom'
import { useDataContext } from '../DataContext'
import Title from '../components/Title'
import Icon from '../components/Icon'
import useActions from '../components/useActions'

const EditorPage = () => {
  const { yText, pages } = useDataContext()
  const { guid } = useParams()
  const navigate = useNavigate()
  const { onAddClick } = useActions()

  if (!guid) navigate('/')

  return (
    <>
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
        <QuillEditor yText={yText} />
      </main>
    </>
  )
}

export default EditorPage
