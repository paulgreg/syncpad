import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import settings from './settings.json'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { DataContext } from './DataContext'
import { useParams } from 'react-router-dom'
import { useY } from 'react-yjs'
import { IndexeddbPersistence } from 'y-indexeddb'

const newTitle = 'unamed'

interface DataContextProviderPropsType {
  guid?: string
  children: React.ReactNode | React.ReactNode[]
}

const DataContextProvider: React.FC<DataContextProviderPropsType> = ({
  guid = '',
  children,
}) => {
  const provider = useRef<WebsocketProvider>(null)
  const persistence = useRef<IndexeddbPersistence>(null)
  const { index: indexParam } = useParams()
  const [index, setIndex] = useState(0)

  const yDoc = useMemo(() => new Y.Doc({ guid }), [guid])
  const yTitles = yDoc.getArray<string>(`titles`)
  const yTexts = yDoc.getArray<Y.Text>(`texts`)

  useEffect(() => {
    if (indexParam) {
      const nbIndexParam = parseInt(indexParam, 10)
      if (nbIndexParam !== index) {
        setIndex(nbIndexParam)
      }
    }
  }, [index, indexParam])

  useEffect(() => {
    persistence.current = new IndexeddbPersistence(guid, yDoc)
    if (settings.saveOnline && settings.wsUrl) {
      provider.current = new WebsocketProvider(settings.wsUrl, guid, yDoc)
      return () => provider.current?.disconnect()
    }
  }, [guid, yDoc])

  const updateTitle = useCallback(
    (title: string) => {
      yDoc.transact(() => {
        if ((yTitles?.length ?? 0) > 0) yTitles?.delete(index, 1)
        yTitles?.insert(index, [title])
      })
    },
    [index, yDoc, yTitles]
  )

  const addPage = useCallback(() => {
    const newIndex = yTitles?.length ?? 0
    yDoc.transact(() => {
      yTitles?.insert(newIndex, [newTitle])
      yTexts?.insert(newIndex, [new Y.Text()])
    })
    setIndex(newIndex)
    return newIndex
  }, [yDoc, yTexts, yTitles])

  const removePage = useCallback(
    (index: number) => {
      yDoc.transact(() => {
        yTitles?.delete(index, 1)
        yTexts?.delete(index, 1)
      })
      setIndex(0)
    },
    [yDoc, yTexts, yTitles]
  )

  const yText = yTexts?.get(index)
  const titles = useY(yTitles)
  const title = titles[index] ?? ''
  const texts = useY(yTexts)

  const contextValue = useMemo(
    () => ({
      guid,
      index,
      setIndex,
      titles,
      title,
      setTitle: updateTitle,
      addPage,
      removePage,
      texts,
      yText,
    }),
    [guid, index, titles, title, updateTitle, addPage, removePage, texts, yText]
  )

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  )
}

export default DataContextProvider
