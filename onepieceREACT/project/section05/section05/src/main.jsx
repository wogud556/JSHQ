import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const Hello = () => {
  return <div>hello</div>;
};

createRoot(document.getElementById('root')).render(
    <App />
)
