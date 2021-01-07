import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Navbar } from './components/navbar/Navbar';
import { UserFetcher } from './auth/UserFetcher';
import { Login } from './auth/Login';
import { Logout } from './auth/Logout';
import { Dashboard } from './dashboard/Dashboard';
import { RequireAuth } from './auth/RequireAuth';
import { ProjectRead } from './dashboard/project/ProjectRead';
import { Home } from './home/Home';

export const App: React.FC = () => {
  return (
    <div>
      {head()}
      <UserFetcher />
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/dashboard' exact>
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        </Route>
        <Route path='/dashboard/projects/:id' exact>
          <RequireAuth>
            <ProjectRead />
          </RequireAuth>
        </Route>
        <Route path='/login' exact>
          <Login afterLoginRedirect='/dashboard' />
        </Route>
        <Route path='/logout' exact>
          <Logout />
        </Route>
      </Switch>
    </div>
  );
};

function head() {
  return (
    <Helmet>
      <title>SMART - Be Productive!</title>
    </Helmet>
  );
}
