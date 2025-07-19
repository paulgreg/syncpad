import s from './App.module.css'
import { Outlet, useParams } from 'react-router-dom'
import { useDataContext } from './DataContext'

const App = () => {
  const { guid, setGuid, index, setIndex } = useDataContext()
  const { guid: guidParam, index: indexParam } = useParams()

  if (guidParam && guidParam !== guid) {
    setGuid(guidParam)
  }
  if (indexParam) {
    const nbIndexParam = parseInt(indexParam, 10)
    if (nbIndexParam !== index) {
      setIndex(nbIndexParam)
    }
  }

  return (
    <div className={s.root}>
      <Outlet />
    </div>
  )
}

export default App
