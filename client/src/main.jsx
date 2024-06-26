import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Landing from './pages/Landing.jsx'
import NotFound from './pages/NotFound.jsx'
import Store from './pages/Store.jsx'
import SingUp from './pages/SingUp.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Item from './pages/Item.jsx'
import { ProfileArea,AdminArea,SignoutArea,AddressArea,PayMTArea,OrderArea} from './components/ProfileComps.jsx'
import AppContext from './contexts/AppContext.jsx'
import Checkout from './pages/Checkout.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Landing />, 
    errorElement:<NotFound />
  },{
    path:'/store',
    element:<Store />
  },{
    path:'/signup',
    element:<SingUp />
  },{
    path:'/login',
    element:<Login />
  },{
    path:'/profile',
    element:<Profile />,
    children:[
      {
        path:'',
        element:<ProfileArea />
      },
      {
        path:'orders',
        element:<OrderArea />
      },
      {
        path:'addresses',
        element:<AddressArea />
      },
      {
        path:'payments',
        element:<PayMTArea />
      },
      {
        path:'admin',
        element:<AdminArea />
      },
      {
        path:'signout',
        element:<SignoutArea />
      },
    ]
  },{
    path:'/item/:id',
    element:<Item />
  },{
    path:'/checkout',
    element:<Checkout />
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContext>
      <RouterProvider router={router}/>
    </AppContext>
  </React.StrictMode>,
)
