import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DashboardIcon, AnalysisIcon, NotificationsMenuIcon } from "../Icons/icons.component";
import { NavLink } from 'react-router-dom';

import './sidebars.css'
const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <div className="d-flex flex-column flex-shrink-0 bg-light" style={{width: "4.5rem" }}>
    <a href="/" className="d-block p-3 link-dark text-decoration-none" title="Icon-only" data-bs-toggle="tooltip" data-bs-placement="right">
      <svg className="bi" width="40" height="32"><use xlinkHref="#bootstrap"/></svg>
      <span className="visually-hidden">Icon-only</span>
    </a>
    <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
      <li className="nav-item">
        <NavLink to="/dashboard" className="nav-link  py-3 border-bottom" aria-current="page" title="Home" data-bs-toggle="tooltip" data-bs-placement="right">
          <DashboardIcon />
        </NavLink>
      </li>
       <li>
        <NavLink to="/view-upload" className="nav-link py-3 border-bottom" title="View Upload" data-bs-toggle="tooltip" data-bs-placement="right">
         <AnalysisIcon />
        </NavLink>
      </li>
      <li>
      <NavLink to="/view-setting" className="nav-link py-3 border-bottom" title="Setting" data-bs-toggle="tooltip" data-bs-placement="right">
         <NotificationsMenuIcon />
        </NavLink>
      </li>
     {/* <li>
        <a href="#" className="nav-link py-3 border-bottom" title="Products" data-bs-toggle="tooltip" data-bs-placement="right">
          <svg className="bi" width="24" height="24" role="img" aria-label="Products"><use xlinkHref="#grid"/></svg>
        </a>
      </li>
      <li>
        <a href="#" className="nav-link py-3 border-bottom" title="Customers" data-bs-toggle="tooltip" data-bs-placement="right">
          <svg className="bi" width="24" height="24" role="img" aria-label="Customers"><use xlinkHref="#people-circle"/></svg>
        </a>
      </li> */}
    </ul>
    
  </div>

  )
}

export default React.memo(AppSidebar)
