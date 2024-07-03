import Spline from '@splinetool/react-spline';
import React from 'react';

const SplineScene = ({ onSplineMouseDown, onLoad }) => {
 
    return (
        <main className="w-screen h-screen">
              <Spline
                    scene="https://prod.spline.design/T8ZGXKq8t1ydh3hp/scene.splinecode" // Replace with your actual scene URL
                    onSplineMouseDown={onSplineMouseDown}
                    onLoad={onLoad}
                />
        </main>
    );
};

export default SplineScene;
