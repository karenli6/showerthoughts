import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './react-components/App';
import TouchFree from './lib/TouchFree_Tooling';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';

TouchFree.Init();

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<App />);