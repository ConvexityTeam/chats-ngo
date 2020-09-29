import React, { lazy, useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'

import AuthService from "./services/auth.service";

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

function App() {
  const [currentNGO, setCurrentNGO] = useState(undefined);

  useEffect(() => {
    const organization = AuthService.getCurrentNGO();

    if (organization) {
      setCurrentNGO(organization);
    }
  }, []);

  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          {currentNGO ? (
            <Route path="/app" component={Layout} />
          ) : (
            <>
              <Route path="/login" component={Login} />
              <Route path="/create-account" component={CreateAccount} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Redirect exact from="/" to="/login" />
            </>
          )}
          

          {/* Place new routes over this */}
          
          {/* If you have an index page, you can remothis Redirect */}
          
        </Switch>
      </Router>
    </>
  )
}

export default App
