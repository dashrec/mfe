import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';


// is create a new vue application and eventually show it inside of this el right here. Remember, that's our HTML element.
// Mount function to start up the app
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');

  if (devRoot) {
    mount(devRoot);
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