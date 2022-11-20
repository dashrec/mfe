import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';

export default () => {
  const ref = useRef(null);

  useEffect(() => {  // call mount function only one time, when this component first display on the screen
    mount(ref.current);
  });

  return <div ref={ref} />; //So that is the reference to the HTML element.
};


// So that is the reference to the HTML element.
// We are passing that into the mount function. Mount  it's gonna try to create an instance of our MarketingApp
// and render it into that div.