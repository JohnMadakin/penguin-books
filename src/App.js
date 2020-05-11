import React, { useContext } from "react";
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Layout from './layout/Layout';
import LoginService from './services/login.service';
import routes from './routes/index'
import { store } from './store';
// class App extends React.Component {
  function App(){

    const user = useContext(store);
    const checkUser = LoginService.CheckAuthenticationStatus();

    if(checkUser.isAuthenticated){
      user.isAuthenticated = checkUser.isAuthenticated;
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route 
            exact path='/'
            render={(props) => user.isAuthenticated ? <Redirect
              to={{
                pathname: "/dashboard",
                state: { from: props.location }
              }}
            />: <Homepage {...props} />}

          />

          {routes.map(route => {
            if(route.protected){
              return (
                <Route 
                path={route.path}
                key={route.name}
                  render={(props) => user.isAuthenticated ? <Layout><route.component {...props} /></Layout> : <Redirect
                    to={{
                      pathname: "/",
                      state: { from: props.location }
                    }}
                  />}
                >
                </Route>
              );
            }else{
             return(
               <Route
                 path={route.path}
                 key={route.name}
                 render={props => <Layout><route.component {...props} /></Layout>}
               /> 
               );
            }
        } )}
        </Switch>
      </BrowserRouter>
    
    );
}

export default hot(App);