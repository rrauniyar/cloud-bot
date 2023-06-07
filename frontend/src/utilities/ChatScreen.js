import { useEffect, useState } from "react";
import axios from "axios";
import { myAxios } from "../services/helper";
import { ChatOutput } from "../utilities/ChatOutput";
import { SideBarForChat } from "./SideBarForChat";
import { useParams } from "react-router-dom";

export const ChatScreen = () => {
    const [input, setInput] = useState("");
    const [chatList, setChatList] = useState([]);
    const [Data, setData] = useState([]);

    let userInput = "";
    let serverResponse = "";
    let { index } = useParams();

    useEffect(() => {
        fetchInitailData();
    }, []);


    function fetchInitailData() {
        const chatListData = myAxios.get("/auth/all-chats").then((response) => response.data).then((response) => {
            setChatList([...chatList, response.data]);
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });

        console.log(chatListData);

        const allChatsResponse = myAxios.get(`/auth/chat/${parseInt(index) + 1}`).then((response) => response.data).then((response) => {
            console.log(response);
            setData([...Data, response]);
        }).catch((error) => {

            console.log(error);
        })
        console.log(allChatsResponse);
    }
    async function SubmitHandler(event) {
        event.preventDefault();
        userInput = userInput + "-" + input;

        const sendDatatoApi = {
            userInput: userInput,
            serverResponse: serverResponse,
            id: parseInt(index) + 1

        }
        const response = await axios.get("https://catfact.ninja/fact?max_length=560");
        serverResponse = serverResponse + "-" + response.data.fact;
        sendDatatoApi["serverResponse"] = serverResponse;
        const responseFromapi = myAxios.post("/auth/chat", sendDatatoApi).then((response) => response.data).then((response) => {
            console.log(response);
        }).catch((tokenerror) => {
            console.log(tokenerror);
        })

        setData([...Data, sendDatatoApi]);
        setInput("");
        console.log(responseFromapi);

    }

    return (



        <div className="chat dark">
            <SideBarForChat index={index} />
            {!(chatList.length === 0 || chatList[0].length === 0) ? (
                <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen dark:bg-gray-900">
                    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 dark:border-gray-700">
                        <div className="relative flex items-center space-x-4">
                            <div className="relative">
                                <span className="absolute text-green-500 right-0 bottom-0">
                                    <svg width="20" height="20">
                                        <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                                    </svg>
                                </span>
                            </div>
                            <div className="flex flex-col leading-tight">
                                <div className="text-2xl mt-1 flex items-center">
                                    <span className="text-gray-700 mr-3 dark:text-gray-300">Anderson Vanhron</span>
                                </div>
                                <span className="text-lg text-gray-600 dark:text-gray-400">Junior Developer</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                            <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </button>
                            <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch dark:bg-gray-800">
                        {Data.map((message, index) => (
                            <ChatOutput key={index} message={message} />
                        ))}
                    </div>
                    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0 dark:border-gray-700">
                        <div className="relative flex">

                            <input onChange={(e) => setInput(e.target.value)} type="text" value={input} placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:bg-gray-600" />
                            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">

                                <button onClick={SubmitHandler} type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-600">
                                    <span className="font-bold">Send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-screen flex items-center justify-center dark:bg-gray-900">
                    <span className="text-2xl text-gray-600 dark:text-gray-400">No messages available</span>
                </div>
            )}
        </div>

    )
}
