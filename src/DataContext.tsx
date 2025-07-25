import { createContext, useContext } from 'react'
import * as Y from 'yjs'

type DataContextType = {
  guid: string
  index: number
  setIndex: (index: number) => void
  titles: string[]
  title: string
  setTitle: (title: string) => void
  addPage: () => number
  removePage: (index: number) => void
  yText?: Y.Text
}

export const DataContext = createContext<DataContextType>({} as DataContextType)

export const useDataContext = () => useContext(DataContext)
