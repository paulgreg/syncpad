import sCommon from './CommonPage.module.css'
import sPage from './ListPage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDataContext } from '../DataContext'
import Icon from '../components/Icon'
import useActions from '../components/useActions'

const ListPage = () => {
  const { pages } = useDataContext()
  const { onAddClick, onRemovePage } = useActions()
  const { guid } = useParams()
  const navigate = useNavigate()

  if (!guid) navigate('/')

  const hasDeleteButton = (pages?.length ?? 0) > 1

  return (
    <>
      <header className={sCommon.header}>
        <h2 className={sPage.title}>{guid}</h2>
        <button title="add a page" onClick={onAddClick}>
          <Icon icon="plus" />
        </button>
        <a href="/" title="back to home">
          <button>
            <Icon icon="home" />
          </button>
        </a>
      </header>
      <main>
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
    </>
  )
}

export default ListPage
