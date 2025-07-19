import Editor from '../components/Editor'
import { useNavigate, useParams } from 'react-router-dom'
import { useDataContext } from '../DataContext'
import Title from '../components/Title'
import s from './EditorPage.module.css'

const EditorPage = () => {
  const { setGuid, yText } = useDataContext()
  const params = useParams()
  const { guid } = params
  const navigate = useNavigate()

  if (!guid) {
    navigate('/')
  } else {
    setGuid(guid)
  }

  return (
    <div>
      <div className={s.header}>
        <Title />
        <a href="/" title="back to home">
          🏠
        </a>
      </div>
      <Editor yText={yText} />
    </div>
  )
}

export default EditorPage
