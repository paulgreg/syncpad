import { useCallback } from 'react'
import { useDataContext } from '../DataContext'
import { useNavigate } from 'react-router-dom'

const useActions = () => {
  const { guid, pages, addPage, removePage } = useDataContext()
  const navigate = useNavigate()

  const onAddClick = useCallback(() => {
    const newIndex = addPage()
    navigate(`/editor/${guid}/${newIndex}`)
  }, [addPage, guid, navigate])

  const onRemovePage = useCallback(
    (index: number) => () => {
      if (confirm(`Are you sure to delete « ${pages?.[index]} » ?`)) {
        removePage(index)
      }
    },
    [pages, removePage]
  )

  return { onAddClick, onRemovePage }
}
export default useActions
