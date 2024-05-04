import React, { useState, useEffect } from 'react';
import { Timeline } from 'react-twitter-widgets';
import ProgressBar from 'react-bootstrap/ProgressBar';

const TwitterWidget = (props) => {
  const [isLoaded, setLoaded] = useState(false);

  useEffect(()=>{
    const checkForElement = () => {
        const twitterTimelineDiv = document.querySelector('.twitter-timeline');
        
        if (twitterTimelineDiv) {
          const iframeElement = twitterTimelineDiv.querySelector('iframe');
          
          if (iframeElement) {
            const { height } = iframeElement.getBoundingClientRect();
      
            if (height === 425) {
              //console.log('Element found with iframe height 425:', iframeElement, props.screenName);
              clearInterval(intervalId);
              setLoaded(true); // Set isLoaded to true when the iframe is found with the correct height
            } else {
              //console.log('Iframe found, but height is not 425:', iframeElement,props.screenName);
            }
          } else {
            //console.log('No iframe found within the element with class .twitter-timeline');
          }
        } else {
          //console.log('Element with class .twitter-timeline not found');
        }
    };
      
    // Set an interval to check for the element every 1000 milliseconds (1 second)
    const intervalId = setInterval(checkForElement, 1000);

    // Set a timeout to stop checking after 10000 milliseconds (10 seconds)
    const timeoutId = setTimeout(() => {
        clearInterval(intervalId); // Stop the interval
        console.log('Timeout reached, element not found');
    }, 100000);

    // Cleanup functions
    return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
    };
  },[props.screenName]);

  return (
    <div>
      {!isLoaded && <ProgressBar animated now={100} label="Loading Twitter Widget..." />}
      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: props.screenName,
        }}
        options={{
          height: '425',
        }}
      />
    </div>
  );
};

export default TwitterWidget;
