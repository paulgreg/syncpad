import { useCallback, type ChangeEvent } from 'react'
import { useDataContext } from '../DataContext'
import s from './Title.module.css'

const Title = () => {
  const { title, setTitle } = useDataContext()

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value)
    },
    [setTitle]
  )

  return (
    <input type="text" className={s.input} value={title} onChange={onChange} />
  )
}

export default Title
