import { useRef, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './HomePage.module.css'

const HomePage = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const inputValue = inputRef?.current?.value
    if (inputValue) {
      navigate(`/editor/${inputValue}`)
    }
    return false
  }

  return (
    <main className={s.root}>
      <h1>SyncPad</h1>
      <form onSubmit={onSubmit} autoComplete="on">
        <label htmlFor="pad">Pad : </label>
        <input
          ref={inputRef}
          id="pad"
          type="text"
          minLength={1}
          maxLength={20}
          placeholder="notes"
          required
          autoFocus
        />
        <input type="submit" value="Go" />
      </form>
    </main>
  )
}

export default HomePage
