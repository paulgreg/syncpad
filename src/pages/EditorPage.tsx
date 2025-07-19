import Editor from '../components/Editor'
import { useNavigate, useParams } from 'react-router-dom'
import { useDataContext } from '../DataContext'

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
      <Editor yText={yText} />
    </div>
  )
}

export default EditorPage
