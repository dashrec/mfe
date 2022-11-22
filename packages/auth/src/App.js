import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Signin from './components/Signin';
import Signup from './components/Signup';


const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
})
//receive from bootstrap and provide to router
export default ({ history, onSignIn }) => { 
  return (
    <div>
      <StylesProvider generateClassName = {generateClassName}>
        <Router history={history}> 
          <Switch>
{/* 
              <Route path="/auth/signin" component={Signin} />
              <Route path="/auth/signup" component={Signup} /> */}

            <Route path="/auth/signin">
              <Signin onSignIn={onSignIn} />
            </Route>
            
            <Route path="/auth/signup">
              <Signup onSignIn={onSignIn} />
            </Route>

         
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
 // whenever go to this path -->  path="/auth/signin show this component Signin! simply enough