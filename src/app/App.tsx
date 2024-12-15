import { RouterProvider } from '@tanstack/react-router';

import './style/App.css';
import { createRouter } from './router';

function App() {
  const router = createRouter();

  return <RouterProvider router={router} />;
}

export default App;
