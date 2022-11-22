import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Progress from './components/Progress';
// So this whole lazy thing right here, make sure that we only try to load or import code related to our marketing app component when we try to show this thing on the screen

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));


const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
}) //generate random classname to avoid collision between classes between microServices

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return  (

      <BrowserRouter>
         <StylesProvider generateClassName = {generateClassName}>
            <div>
              <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
              <Suspense fallback={<Progress />}>
                <Switch>
             {/*      <Route path="/auth" component={AuthLazy} /> */}
                  <Route path="/auth">
                    <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                  </Route>

                  <Route path="/" component={MarketingLazy} />
                </Switch>
              </Suspense>
            </div>
        </StylesProvider>
      </BrowserRouter>
  
    );   
};
// So these  Routes right here are going to handle deciding which of our different sub-applications we want to show on the screen.
//ref to Routes if we ever go to auth, that's going to show auth Route. If we go to auth/signin, well, we are still matching the first part of the path to the path prop 
// It creates a router object and behind the scenes it also creates a browser history object for us as well. 
// Suspense is a React component and lazy is a function. These two things work together to allow us to lazily load different components inside of our application.
// So we can use these two tools to make sure that we only attempt to load the code related to our marketing app when a user starts to go to a route related to the marketing app.