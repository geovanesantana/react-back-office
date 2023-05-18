import React from 'react'
import App from '@/components/App'
import store, { RootState } from '@/store'
import { createRoot } from 'react-dom/client'
import { selectDarkMode } from '@/store/darkModeSlice'
import { connect, Provider, useSelector } from 'react-redux'
import './index.css'

const Root = () => {
  const isDarkMode = useSelector(selectDarkMode)

  return (
    <React.StrictMode>
      <div className={`app ${isDarkMode ? 'dark' : ''}`}>
        <App />
      </div>
    </React.StrictMode>
  )
}

const mapStateToProps = (state: RootState) => ({
  darkMode: selectDarkMode(state),
})

const ConnectedRoot = connect(mapStateToProps)(Root)

const rootElement = document.getElementById('root') as HTMLElement
const root = createRoot(rootElement)

root.render(
  <Provider store={store}>
    <ConnectedRoot />
  </Provider>
)
