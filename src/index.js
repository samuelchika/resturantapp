import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { StateProvider } from './components/context/StateProvider';
import { initialState } from './components/context/initialState';
import reducer from './components/context/reducer';

import App from './App';

const Base = () => {
  return (
    <Router>
         <StateProvider reducer={reducer} initialState={ initialState }>
           <App />
         </StateProvider>
        
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Base />);
