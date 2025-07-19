import { createContext, useContext } from 'react'
import * as Y from 'yjs'

type DataContextType = {
  guid?: string
  setGuid: (guid: string) => void
  index: number
  setIndex: (index: number) => void
  pages?: string[]
  title?: string
  setTitle: (title: string) => void
  addPage: () => number
  yText?: Y.Text
}

export const DataContext = createContext<DataContextType>({} as DataContextType)

export const useDataContext = () => useContext(DataContext)
