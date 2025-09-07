import { createContext, useContext } from 'react'
import * as Y from 'yjs'

export enum ConnectionStatus {
  offline,
  connected,
  disconnected,
}

type DataContextType = {
  name: string
  index: number
  setIndex: (index: number) => void
  titles: string[]
  title: string
  setTitle: (title: string) => void
  addPage: () => number
  removePage: (index: number) => void
  texts: string[]
  yText?: Y.Text
  connectionStatus: ConnectionStatus
}

export const DataContext = createContext<DataContextType>({} as DataContextType)

export const useDataContext = () => useContext(DataContext)
