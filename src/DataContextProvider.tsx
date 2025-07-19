import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import settings from './settings.json'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { DataContext } from './DataContext'

const DEFAULT_TITLE = 'title'

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

  const [yText, setYText] = useState<Y.Text>()

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
      setYText(yDoc?.getText(`page-${_index}`))
    }
    yPages?.observe(updateDataOnChange)
    yMeta?.observe(updateDataOnChange)
    return () => {
      yPages?.unobserve(updateDataOnChange)
      yMeta?.unobserve(updateDataOnChange)
    }
  }, [yPages, yMeta, yDoc, index])

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

  const addPage = useCallback(() => {
    const newIndex = pages?.length ?? 0
    yPages?.insert(newIndex, [DEFAULT_TITLE])
    yMeta?.set('index', newIndex)
    return newIndex
  }, [pages, yMeta, yPages])

  const contextValue = useMemo(
    () => ({
      guid,
      setGuid,
      index,
      setIndex: updateIndex,
      pages,
      title,
      setTitle: updateTitle,
      addPage,
      yText,
    }),
    [guid, index, updateIndex, pages, title, updateTitle, addPage, yText]
  )

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  )
}

export default DataContextProvider
