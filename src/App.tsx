import {RoutesApp} from './Routes';
import store from './store';
import { Provider } from 'react-redux';
import './global.module.css'
function App() {

  return (
    <Provider store={store}>
      <RoutesApp />
    </Provider>
  )
}

export default App
