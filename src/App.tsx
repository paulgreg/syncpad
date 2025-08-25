import s from './App.module.css'
import { Outlet, useParams } from 'react-router-dom'
import DataContextProvider from './DataContextProvider'

const InnerApp = () => (
  <div className={s.root}>
    <Outlet />
  </div>
)

const App = () => {
  const { name } = useParams()

  if (name) {
    return (
      <DataContextProvider name={name}>
        <InnerApp />
      </DataContextProvider>
    )
  }

  return <InnerApp />
}

export default App
