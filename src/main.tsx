import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global/global.scss'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ClientQuery } from './config/queryClient.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={ClientQuery}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
)
