import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter as Router } from 'react-router-dom'
import AppContext from './context/AppContext'
import store from './redux/store'
import { Provider } from 'react-redux'



ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <Provider store={store}>
    {/* <ErrorBoundary> */}
        <AppContext>
          <Router>
            <App />
          </Router>
        </AppContext>
    {/* </ErrorBoundary> */}
      </Provider>
  // </React.StrictMode>
)
