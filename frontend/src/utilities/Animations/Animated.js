import React from 'react';
import { useSpring, animated } from 'react-spring';

export const Animated = (props) => {

    const props1 = useSpring({
        opacity: 1,
        from: { opacity: 0 },
    });

    return (
        <animated.div style={props1} className="background-container">
            <img src={props.image} alt="Background" className="background-image" />
        </animated.div>
    );
};

