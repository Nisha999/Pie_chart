import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import SelectionForm from './SelectionForm'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
