import React from 'react';
import { Discuss } from 'react-loader-spinner';

import { AiFillRobot } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
export const ChatOutput = (props) => {
    const Data = props.message;
    const userInput = Data.map((message) => message.userInput);
    const serverResponse = Data.map((message) => message.serverResponse.text);


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
                                        <AiOutlineUser style={{ color: 'red', fontSize: '34px' }} />
                                        <div className="flex flex-row space-y-2 text-s max-w-xs mx-2 order-1 items-end mt-8">

                                            <div>
                                                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">
                                                    {input}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {serverResponseValue ? (
                                        <div className="flex items-end">
                                            <AiFillRobot style={{ color: 'blue', fontSize: '50px' }} />
                                            <div className="flex flex-col space-y-2 text-s max-w-s mx-2 order-2 items-start mt-8">
                                                <div style={{ maxWidth: '700px', whiteSpace: 'pre-wrap' }}>
                                                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                                        {serverResponseValue.trim()}
                                                       
                                                        {/* <br />
                                                        <br />
                                                        <strong>Suggested FollowUp Questions:</strong>
                                                        <br />
                                                        {serverResponseQuestionValue}
                                                        <button
                                                            className="text-blue-500 hover:text-blue-700 underline pl-2"
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(serverResponseQuestionValue);
                                                            }}
                                                        >
                                                            <CopyTextIcon />
                                                        </button> */}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        // <div className="flex items-end">
                                        //     <AiFillRobot style={{ color: 'blue', fontSize: '50px' }} />
                                        //     <div className="flex flex-col space-y-2 text-s max-w-s mx-2 order-2 items-start mt-8">
                                        //         <div>
                                        //             <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                        //                 {serverResponseValue}
                                        //                 <br />
                                        //                 <br />
                                        //                 <strong>Suggested FollowUp Questions:</strong>
                                        //                 <br />
                                        //                 {serverResponseQuestionValue}
                                        //                 <button
                                        //                     className="text-blue-500 hover:text-blue-700 underline pl-2"
                                        //                     onClick={() => {
                                        //                         navigator.clipboard.writeText(serverResponseQuestionValue);
                                        //                     }}
                                        //                 >
                                        //                     <CopyTextIcon />
                                        //                 </button>
                                        //             </span>
                                        //         </div>
                                        //     </div>
                                        // </div>
                                    ) : (
                                        <Discuss />
                                    )}
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};



