import ReactDOM from 'react-dom/client';
import { App, AllProviders } from 'app';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AllProviders>
    <App />
  </AllProviders>
);
