import React from "react";
import { hot } from 'react-hot-loader/root';
import Homepage  from './pages/Homepage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Book from './pages/Book';
import ListAuthors from './pages/ListAuthors';

import routes from './routes/index'

// class App extends React.Component {
  function App(){
  // render() {
    // const { name } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route 
            exact path='/'
            render ={props => <Homepage {...props} />}

          />

          {routes.map(route => (
          <Route
            path = {route.path}
            key = {route.name}
              render={props => <Layout><route.component {...props} /></Layout>}
            />
          ))}
        </Switch>
      </BrowserRouter>
    
    );
}

export default hot(App);