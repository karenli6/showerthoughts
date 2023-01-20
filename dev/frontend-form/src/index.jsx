import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<App />);