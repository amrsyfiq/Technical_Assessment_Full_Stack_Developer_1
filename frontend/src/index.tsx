import ReactDOM from 'react-dom/client';  
import { Provider } from 'react-redux';    
import { store } from './app/store';   
import "./index.css";
import App from './App';     
import 'flowbite/dist/flowbite.css';

// Ensure the root element exists before rendering the app
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Create the root element with React 18+

  root.render(
    <Provider store={store}>  {/* Wrap your app with Redux provider */}
      <App />
    </Provider>
  );
} else {
  console.error('Root element not found!');
}
