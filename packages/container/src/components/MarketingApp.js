import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const history = useHistory(); // So in this case it is a copy of a browser history.
  useEffect(() => {
    // call mount function only one time, when this component first display on the screen 

    const {onParentNavigate} = mount(ref.current, { 

      initialPath: history.location.pathname, // current path

      onNavigate: ({ pathname: nextPathname }) => { // rename to nextPathname
       
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    history.listen(onParentNavigate); //anytime there is any change to our browser history we want to call onParentNavigate.

  });

  return <div ref={ref} />; //So that is the reference to the HTML element.
};

// So that is the reference to the HTML element.
// We are passing that into the mount function. Mount  it's gonna try to create an instance of our MarketingApp
// and render it into that div.
// location is an object that has some information about where we are about to navigate to inside the marketing application.
// ref to history push  "Hey, history object, we want to navigate to this new path and the path we are attempting to navigate to is nextPathname."
// ref to if So to prevent infinite flow,  we're going to add in a little check to decide whether or not we actually want to have our history object navigate.
