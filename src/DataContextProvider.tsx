import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import settings from './settings.json'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { DataContext } from './DataContext'

const DEFAULT_TITLE = 'Notes'
interface DataContextProviderPropsType {
  children: React.ReactNode | React.ReactNode[]
}

const DataContextProvider: React.FC<DataContextProviderPropsType> = ({
  children,
}) => {
  const provider = useRef<WebsocketProvider>(null)
  const [guid, setGuid] = useState<string>()
  const [yDoc, setYDoc] = useState<Y.Doc>()
  const [yPages, setYPages] = useState<Y.Array<string>>()
  const [yMeta, setYMeta] = useState<Y.Map<number>>()

  const [pages, setPages] = useState<string[]>()
  const [title, setTitle] = useState<string>()
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    if (guid) {
      const y = new Y.Doc({ guid })
      setYDoc(y)
      setYPages(y.getArray<string>(`pages`))
      setYMeta(y.getMap<number>('meta'))
      provider.current = new WebsocketProvider(settings.wsUrl, guid, y)
    }
    return () => {
      setYDoc(undefined)
      provider.current?.disconnect()
    }
  }, [guid])

  useEffect(() => {
    const updateDataOnChange = () => {
      const _index = yMeta?.get('index') ?? 0
      const _pages = yPages?.toArray()
      setIndex(_index)
      setPages(_pages)
      setTitle(_pages?.[_index] ?? DEFAULT_TITLE)
    }
    yPages?.observe(updateDataOnChange)
    yMeta?.observe(updateDataOnChange)
    return () => {
      yPages?.unobserve(updateDataOnChange)
      yMeta?.unobserve(updateDataOnChange)
    }
  }, [yPages, yMeta])

  const updateTitle = useCallback(
    (title: string) => {
      if ((yPages?.length ?? 0) > 0) yPages?.delete(index, 1)
      yPages?.insert(index, [title])
    },
    [index, yPages]
  )
  const updateIndex = useCallback(
    (i: number) => {
      yMeta?.set('index', i)
    },
    [yMeta]
  )

  const contextValue = useMemo(
    () => ({
      setGuid,
      index,
      setIndex: updateIndex,
      pages,
      title,
      setTitle: updateTitle,
      yText: yDoc?.getText(`page-${index}`),
    }),
    [yDoc, pages, index, title, updateIndex, updateTitle]
  )

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  )
}

export default DataContextProvider
