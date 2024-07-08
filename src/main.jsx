import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter } from 'react-router-dom'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react';

const queryClient  = new QueryClient()

// const localStoragePersistor = createSyncStoragePersister({
//   storage: window.localStorage
// })


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
      {/* <PersistQueryClientProvider client={queryClient} persistOptions={{persister:localStoragePersistor}}>
      <App />
      <ReactQueryDevtools/>
      </PersistQueryClientProvider> */}
      <QueryClientProvider client={queryClient}> 
      <Analytics />
      <App/>
      {/* <ReactQueryDevtools/> */}
      
       </QueryClientProvider>
     
      </BrowserRouter>
   
    </NextUIProvider>
    
  </React.StrictMode>,
)
