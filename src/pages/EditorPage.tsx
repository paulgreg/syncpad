import sCommon from './CommonPage.module.css'
import QuillEditor from '../components/QuillEditor'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDataContext } from '../DataContext'
import Title from '../components/Title'
import Icon from '../components/Icon'
import useActions from '../components/useActions'

const EditorPage = () => {
  const { yText, titles } = useDataContext()
  const { guid } = useParams()
  const { onAddClick } = useActions()
  const navigate = useNavigate()

  if (!guid) navigate('/')

  return (
    <>
      <header className={sCommon.header}>
        <Title />
        <Link to={`/list/${guid}`} title="list view">
          <button disabled={(titles?.length ?? 0) === 0}>
            <Icon icon="list" />
          </button>
        </Link>
        <button title="add a page" onClick={onAddClick}>
          <Icon icon="plus" />
        </button>
        <Link to="/" title="back to home">
          <button>
            <Icon icon="home" />
          </button>
        </Link>
      </header>
      <main>
        <QuillEditor yText={yText} />
      </main>
    </>
  )
}

export default EditorPage
