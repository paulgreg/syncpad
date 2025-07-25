import sCommon from './CommonPage.module.css'
import sPage from './ListPage.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDataContext } from '../DataContext'
import Icon from '../components/Icon'
import useActions from '../components/useActions'

const ListPage = () => {
  const { titles } = useDataContext()
  const { onAddClick, onRemovePage } = useActions()
  const { guid } = useParams()
  const navigate = useNavigate()

  if (!guid) navigate('/')

  const hasDeleteButton = (titles?.length ?? 0) > 1

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
          {titles?.map((title, idx) => (
            <li key={`${idx}-${title}`} className={sPage.row}>
              <span className={sPage.innerRow}>
                <Link to={`/editor/${guid}/${idx}`} className={sPage.name}>
                  <span className={sPage.number}>{idx + 1}.</span>
                  {title}
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
