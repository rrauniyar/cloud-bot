import React from 'react';
import { useSpring, animated } from 'react-spring';

export const DialogBox = ({ isOpen, onClose, message }) => {
    const animation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
    });

    return (
        <animated.div style={animation}>
            <div className="dialog-box">
                <div className="dialog-content">
                    <p>{message}</p>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </animated.div>
    );
};

