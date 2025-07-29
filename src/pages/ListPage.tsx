import sCommon from './CommonPage.module.css'
import sPage from './ListPage.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDataContext } from '../DataContext'
import Icon from '../components/Icon'
import useActions from '../components/useActions'

const ListPage = () => {
  const { titles, texts } = useDataContext()
  const { onAddClick, onRemovePage } = useActions()
  const { guid } = useParams()
  const navigate = useNavigate()

  if (!guid) navigate('/')

  const hasDeleteButton = (titles?.length ?? 0) > 1

  const lengths = texts.map((str = '') => str?.length ?? 0)
  const wordsCount = texts.map(
    (str = '') => str.trim().split(/\s+/).filter(Boolean).length
  )

  return (
    <>
      <header className={sCommon.header}>
        <h2 className={sPage.title}>{guid}</h2>
        <button title="add a page" onClick={onAddClick}>
          <Icon icon="plus" />
        </button>
        <Link to="/" title="back to home">
          <button>
            <Icon icon="home" />
          </button>
        </Link>
      </header>
      <main>
        <ul className={sPage.list}>
          {titles.length === 0 && (
            <li>No page, create one with the + button</li>
          )}
          {titles?.map((title, idx) => (
            <li key={`${idx}-${title}`} className={sPage.row}>
              <span className={sPage.innerRow}>
                <Link to={`/editor/${guid}/${idx}`} className={sPage.item}>
                  <span className={sPage.number}>{idx + 1}.</span>
                  <span className={sPage.name}>{title}</span>
                  <span className={sPage.lengths}>
                    ({lengths[idx]} chars, {wordsCount[idx]} words)
                  </span>
                </Link>
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
