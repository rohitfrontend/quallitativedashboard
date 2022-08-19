import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { isAuthenticated } from './store/selectors/AuthSelectors';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App (props) {
  console.log('isAuthenticated', props.isAuthenticated)

    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
                          {/* <Route exact path="/" element={<RequireAuth><Dashborad /></RequireAuth>} /> */}

            <Route exact path="/login" name="Login Page" element={<Login />} />
            {/* <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
            <Route path="*" name="Home" element={<RequireAuth props><DefaultLayout /></RequireAuth>} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
}


function RequireAuth(props) {

  let auth = true;
  let location = useLocation();
  console.log('isAuthenticated', props.isAuthenticated)

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return props.children;
}

const mapStateToProps = (state) => {
  return {
      isAuthenticated: isAuthenticated(state),
  };
};
export default connect(mapStateToProps)(App); 
