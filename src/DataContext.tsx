import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

type DataContextType = {
  setGuid: (guid: string) => void
  page: string
  setPage: (page: string) => void
  yText?: Y.Text
}

const DataContext = createContext<DataContextType>({} as DataContextType)

export const useDataContext = () => useContext(DataContext)

interface DataContextProviderPropsType {
  children: React.ReactNode | React.ReactNode[]
}

const DataContextProvider: React.FC<DataContextProviderPropsType> = ({
  children,
}) => {
  const provider = useRef<WebsocketProvider>(null)
  const [guid, setGuid] = useState<string>()
  const [page, setPage] = useState('default')
  const [yDoc, setYDoc] = useState<Y.Doc>()
  const [yText, setYText] = useState<Y.Text>()

  useEffect(() => {
    if (guid) {
      const y = new Y.Doc({ guid })
      setYDoc(y)
      provider.current = new WebsocketProvider(
        'ws://localhost:1234/ws',
        guid,
        y
      )
    }
    return () => {
      setYDoc(undefined)
      setYText(undefined)
      provider.current?.disconnect()
    }
  }, [guid])

  useEffect(() => {
    if (yDoc && page) setYText(yDoc.getText(page))
  }, [yDoc, page, setYText])

  const contextValue = useMemo(
    () => ({
      setGuid,
      page,
      setPage,
      yText,
    }),
    [page, yText]
  )

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  )
}

export default DataContextProvider
