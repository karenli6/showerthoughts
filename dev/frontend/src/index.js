import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
//import RandomApp from './RandomApp';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<App />);
//root.render(<RandomApp />);