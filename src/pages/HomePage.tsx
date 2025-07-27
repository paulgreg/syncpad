import { useRef, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const inputValue = inputRef?.current?.value
    if (inputValue) {
      navigate(`/list/${inputValue}`)
    }
    return false
  }

  return (
    <>
      <header>
        <h1>SyncPad</h1>
      </header>
      <main>
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
    </>
  )
}

export default HomePage
