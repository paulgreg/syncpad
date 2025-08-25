import { useCallback } from 'react'
import { useDataContext } from '../DataContext'
import { useNavigate } from 'react-router-dom'

const useActions = () => {
  const { name, titles, addPage, removePage } = useDataContext()
  const navigate = useNavigate()

  const onAddClick = useCallback(() => {
    const newIndex = addPage()
    navigate(`/editor/${name}/${newIndex}`)
  }, [addPage, name, navigate])

  const onRemovePage = useCallback(
    (index: number) => () => {
      if (confirm(`Are you sure to delete « ${titles?.[index]} » ?`)) {
        removePage(index)
      }
    },
    [removePage, titles]
  )

  return { onAddClick, onRemovePage }
}
export default useActions
