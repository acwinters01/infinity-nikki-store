import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './features/app/App'
import { store } from './store';
import './utilities/reset.css'


const rootElement = (document.getElementById('root'));
// Because tsx is dumb and wants me to make sure rootElement is not null. 
if(!rootElement) {
  throw new Error("Root element not found");
}
const root = createRoot(rootElement);


const render = () => {

  root.render(
    <StrictMode>
      <Provider store={store}>
        <App
          state = {store.getState()}
          dispatch = {store.dispatch}
        />
      </Provider>
    </StrictMode>
  )
};

render();

store.subscribe(render)