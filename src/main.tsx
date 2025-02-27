import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import { store } from './store';
import './reset.css'


const rootElement = (document.getElementById('root'));
// Because tsx is dumb and wants me to make sure rootElement is not null. 
if(!rootElement) {
  throw new Error("Root element not found");
}
const root = createRoot(rootElement);


const render = () => {

  root.render(
    <StrictMode>
      <App 
        state={store.getState()}
        dispatch={store.dispatch}
      />
    </StrictMode>
  )
};

render();

store.subscribe(render)