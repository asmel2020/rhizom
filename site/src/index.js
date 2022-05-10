import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './css/index.css';
import { MoralisProvider  } from "react-moralis";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <MoralisProvider serverUrl="https://dgghiqu9omhp.usemoralis.com:2053/server" appId="zEEsDEd8cJ9hbxwlMQxOAP6hXdjLKbVdQTTygiS8">
    <App />
    </MoralisProvider>
  </React.StrictMode>
);

