import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ViewUpload = React.lazy(() => import('./views/dashboard/ViewUpload'))
const ViewSetting = React.lazy(() => import('./views/dashboard/ViewSetting'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/view-upload', name: 'View Upload', element: ViewUpload },
  { path: '/view-setting', name: 'View Setting', element: ViewSetting },
]

export default routes
