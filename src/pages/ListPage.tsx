import sCommon from './CommonPage.module.css'
import sPage from './ListPage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDataContext } from '../DataContext'
import Icon from '../components/Icon'

const ListPage = () => {
  const { pages } = useDataContext()
  const { guid } = useParams()
  const navigate = useNavigate()

  if (!guid) navigate('/')

  return (
    <div>
      <header className={sCommon.header}>
        <h2 className={sPage.title}>{guid}</h2>
        <a href="/" title="back to home">
          <Icon icon="home" />
        </a>
      </header>
      <main className={sPage.main}>
        <ol>
          {pages?.map((page, idx) => (
            <li key={page}>
              <a href={`/editor/${guid}/${idx}`}> {page}</a>
            </li>
          ))}
        </ol>
      </main>
    </div>
  )
}

export default ListPage
