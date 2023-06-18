import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import AppContext from './context/AppContext'
import store from './redux/store'
import { Provider } from 'react-redux'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

Bugsnag.start({
  apiKey: '5ba0dc286bf9ae58ae96edcf240953d4',
  plugins: [new BugsnagPluginReact()]
})

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
    <ErrorBoundary>
        <AppContext>
          <Router>
            <App />
          </Router>
        </AppContext>
    </ErrorBoundary>
      </Provider>
  </React.StrictMode>
)
