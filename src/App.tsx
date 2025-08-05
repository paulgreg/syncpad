import s from './App.module.css'
import { Outlet, useParams } from 'react-router-dom'
import DataContextProvider from './DataContextProvider'

const PREFIX = 'sp'

const InnerApp = () => (
  <div className={s.root}>
    <Outlet />
  </div>
)

const App = () => {
  const { guid } = useParams()

  if (guid) {
    return (
      <DataContextProvider guid={`${PREFIX}:${guid}`}>
        <InnerApp />
      </DataContextProvider>
    )
  }

  return <InnerApp />
}

export default App
