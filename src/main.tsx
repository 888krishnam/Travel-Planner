import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'
import Header from './components/Header.tsx'
import Test from './pages/Home.tsx'
import CreateTrip from './pages/create-trip/index.tsx'
import View from './pages/view-trip/[tripId]/index.tsx'
import History from './pages/my-trips/index.tsx'
import PageNotFound from './components/PageNotFound.tsx'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Visited from './pages/Visited.tsx'

const theme = createTheme({
  palette: {
    primary: {
      light: '#EAFAEA',
      main: '#23501bff',
      dark: '#0a3906ff',
      contrastText: '#EAFAEA',
    },
    secondary: {
      light: '#F0FFFF',
      main: '#89CFF0',
      dark: '#0047AB',
      contrastText: '#00FFFF',
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#EAFAEA',
          color: '#0a3906ff',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          paddingRight: '15rem',
          fontWeight: 'bold',
          fontSize: '1.5rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backgroundColor: "transparent",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#EAFAEA',
          color: '#0a3906ff',
          borderRadius: '4px',
          border: '1px solid #0a3906ff',
          '&:hover': {
            backgroundColor: '#23501bff',
            color: '#EAFAEA',
          },
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path : '/',
    element: <Test />
  },
  {
    path : '/create',
    element: <CreateTrip />
  },
  {
    path : '/view/:tripId',
    element: <View />
  },
  {
    path : '/history',
    element: <History />
  },
  {
    path : '/visited',
    element: <Visited />
  },
  {
    path: '*',
    element: <PageNotFound />
  },
])

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
        <Header />
        <ToastContainer />
        <RouterProvider router = {router} />
      </GoogleOAuthProvider>
    </StrictMode>
  </ThemeProvider>
)
