import { Provider } from 'react-redux'
import store from '../store'

interface Props {
  children: React.ReactNode
}

export default function StoreProvider(props: Props) {
  const { children } = props

  return <Provider store={store}>{children}</Provider>
}
