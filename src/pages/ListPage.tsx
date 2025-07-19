import sCommon from './CommonPage.module.css'
import sPage from './ListPage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDataContext } from '../DataContext'
import Icon from '../components/Icon'
import { useCallback } from 'react'

const ListPage = () => {
  const { pages, removePage } = useDataContext()
  const { guid } = useParams()
  const navigate = useNavigate()

  if (!guid) navigate('/')

  const hasDeleteButton = (pages?.length ?? 0) > 1

  const onRemovePage = useCallback(
    (index: number) => (e: MouseEvent) => {
      e.preventDefault()
      if (confirm(`Are you sure to delete « ${pages?.[index]} » ?`)) {
        removePage(index)
      }
    },
    [pages, removePage]
  )

  return (
    <div>
      <header className={sCommon.header}>
        <h2 className={sPage.title}>{guid}</h2>
        <a href="/" title="back to home">
          <Icon icon="home" />
        </a>
      </header>
      <main className={sPage.main}>
        <ul className={sPage.list}>
          {pages?.map((page, idx) => (
            <li key={page} className={sPage.row}>
              <span className={sPage.innerRow}>
                <span className={sPage.number}>{idx + 1}.</span>
                <a href={`/editor/${guid}/${idx}`} className={sPage.name}>
                  {page}
                </a>
                {hasDeleteButton && (
                  <button onClick={onRemovePage(idx)}>
                    <Icon icon="minus" />
                  </button>
                )}
              </span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default ListPage
