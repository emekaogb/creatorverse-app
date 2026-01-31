import { BrowserRouter, useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import Landing from './components/Landing'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ViewCreator from './pages/ViewCreator'
import CreatorForm from './components/CreatorForm'
import './App.css'

function AppRoutes() {
  const routes = useRoutes([
    {path: '/', element: <Home />},
    {path: '/add', element: <AddCreator />},
    {path: '/edit/:name', element: <EditCreator />},
    {path: 'view/:name', element: <ViewCreator />},
  ])

  return routes
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
