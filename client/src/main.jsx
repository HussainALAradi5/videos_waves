import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider>
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
    </ChakraProvider>
  </BrowserRouter>
)
