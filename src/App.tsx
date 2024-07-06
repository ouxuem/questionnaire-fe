import { RouterProvider, useRoutes } from 'react-router-dom'
import routerConfig from './router'

useRoutes
function App() {
  return (
   
      <RouterProvider router={routerConfig} />
  )
}

export default App
