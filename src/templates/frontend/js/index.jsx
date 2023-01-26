import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './react-components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
//import '../css/test.css';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<App />);
