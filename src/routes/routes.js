import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';

const Routes = () => {
  return (
    <Switch>
      <Route path='/' component={HomePage} /> 
      {/* <Route path='/home' component={HomePage} /> */}
    </Switch>
  )
}

export default Routes;