import { Outlet } from 'react-router-dom'
import s from './App.module.css'

const App = () => (
  <div className={s.root}>
    <Outlet />
  </div>
)

export default App
