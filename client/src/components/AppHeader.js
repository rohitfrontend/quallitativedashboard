import React from 'react'
// import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <div className="navbar navbar-expand-lg navbar-light 0">
          <div className="container-fluid">
            <div className="page-title">
            <h1 >
              Upload Qualitative Report
            </h1>
            </div>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  {/* <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link> */}
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
  )
}

export default AppHeader
