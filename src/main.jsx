import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// import './store-v1';
import store from './store';

store.dispatch({
  type: 'customer/createCustomer',
  payload: { fullName: 'Jesse Mosh', nationalID: 'a2jz', createdAt: new Date() }
});

console.log(store.getState());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
