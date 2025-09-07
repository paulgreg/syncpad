import s from './Status.module.css'
import { ConnectionStatus, useDataContext } from '../DataContext'

const Status = () => {
  const { connectionStatus } = useDataContext()
  if (connectionStatus === ConnectionStatus.offline) return <></>

  const backgroundColor =
    connectionStatus === ConnectionStatus.connected ? 'green' : 'red'
  const label = connectionStatus ? 'Connected' : 'Disconnected'
  return (
    <div className={s.root}>
      <span
        className={s.circle}
        style={{ backgroundColor }}
        title={label}
        aria-label={label}
      ></span>
    </div>
  )
}

export default Status
