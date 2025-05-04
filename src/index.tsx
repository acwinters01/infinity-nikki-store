import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from './App';
import { store } from './store';
import './utilities/reset.css'


// Keep saying it could be null, had to look it up. '! says: I promise this is not null'
const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);