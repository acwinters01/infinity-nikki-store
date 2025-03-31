import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './views/Home';
import Outfits from './views/Outfits';
import Makeup from './views/Makeup';
import Eureka from './views/Eureka';
import { store } from './store';
import './styles/App.css'


export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
            <Routes>
              <Route path="/" element={<Home state = {store.getState()} dispatch = {store.dispatch}/>}>
                <Route path="outfits" element={<Outfits />} />
                <Route path="makeup" element={<Makeup />} />
                <Route path="eureka" element={<Eureka />} />
              </Route>
            </Routes>
        </Provider>
      </BrowserRouter> 
    </>
  )
}

export default App
