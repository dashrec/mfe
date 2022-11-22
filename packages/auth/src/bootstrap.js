import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';
// Mount function to start up the app
const mount = (el, {onSignIn,  onNavigate, defaultHistory, initialPath }) => {  // get onNavigate callback function from parent class container MarketingApp file

  const history = defaultHistory || createMemoryHistory({ initialEntries: [initialPath] });  //if we did not get defaultHistory, create memory history

  if(onNavigate){
    history.listen(onNavigate);//Whenever some navigation occurs, this history object is going to call any function that we have provided to this listen thing.
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history}/>, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {  //  whenever some navigation occurs inside of container
      const { pathname } = history.location;

      console.log(nextPathname);

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};


// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount };




// Again, we are creating it inside of bootstrap cause we're going to eventually add in a lot of code to this file to sync the current state of our history inside
// of marketing with the history object inside of container.
// at some point in time,  our container application is gonna decide  to mount our marketing application. 
// It will create a callback and then call the mount function and provide that callback as onNavigate.
// whenever we call the mount function when we are in isolation, we're going to create a browser history instance and provide it on the options object as a property called default history.