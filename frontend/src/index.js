import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="677176187862-88pjiq0mj8pmfmd5aqk07679n28460pi.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
);



