
import React from 'react';
export const ChatOutput = (props) => {
    const userInput = props.message.userInput.split('-');
    const serverResponse = props.message.serverResponse.split('-');
    return (
        <div className="chatoutput">
            <div className="chat-message">

                {userInput.map((input, index) => {
                    const serverResponseValue = serverResponse[index];
                    return (
                        <React.Fragment key={index}>
                            {input.length > 0 && (
                                <div>
                                    <div className="flex items-end justify-end">
                                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                            <div>
                                                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">
                                                    {input}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-end">
                                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                            <div>
                                                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                                    {serverResponseValue}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}


            </div>

        </div>
    )
}



