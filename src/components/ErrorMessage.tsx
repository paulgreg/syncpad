import React from 'react'

type ErrorMessageType = {
  msg: string
}
const ErrorMessage: React.FC<ErrorMessageType> = ({ msg }) => (
  <main>Error {msg}</main>
)

export default ErrorMessage
