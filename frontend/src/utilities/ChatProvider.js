import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [sideDrawerValue, setSideDrawerValue] = useState('');

    return (
        <ChatContext.Provider value={{ sideDrawerValue, setSideDrawerValue }}>
            {children}
        </ChatContext.Provider>
    );
};
