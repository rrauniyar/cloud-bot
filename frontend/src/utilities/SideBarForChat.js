
import { useState } from "react";
import { myAxios } from "../services/helper";
import { useEffect } from "react";
export const SideBarForChat = (props) => {
    let selectedIndex = -1;

    if (props.index) {
        selectedIndex = parseInt(props.index);
    }

    const [chatList, setChatList] = useState([]);
    useEffect(() => {
        fetchInitailData();
    }, []);

    function fetchInitailData() {
        const chatListData = myAxios.get("/auth/all-chats").then((response) => response.data).then((response) => {
            setChatList(response.data);
        }).catch((error) => {
            console.log(error);
        });
        console.log(chatListData);
    }

    function createChat(index) {
        const sendDatatoApi = {
            userInput: "",
            serverResponse: "",
            id: parseInt(index) + 1,
        }
        const responseFromapi = myAxios.post("/auth/new-chat", sendDatatoApi).then((response) => response.data).then((response) => {
            fetchInitailData();
            console.log(response);
        }).catch((tokenerror) => {
            console.log(tokenerror);
        })

        console.log(responseFromapi);

    }

    function HandleNewListItem() {

        const sendDatatoListApi = {
            chatTitle: "akhilhere",
        }

        const responseFromNewListIemApi = myAxios.post("/auth/create-chat", sendDatatoListApi).then((response) => response.data).then((response => {
            createChat(response.chatId);

        })).catch((error) => {
            console.log(error);
        });

        console.log(responseFromNewListIemApi);

    }


    return (
        <div className="flex  bg-white">
            <div className="flex flex-col  border-r-2 overflow-y-auto">
                <div className="border-b-2 py-4 px-2">
                    <input
                        type="text"
                        placeholder="search chatting"
                        className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                    />
                </div>

                {chatList.map((ListItem, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                        <a href={`/chat/${index}`} key={index}>
                            <div className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 ${isSelected ? 'border-blue-300' : 'border-transparent'} ${isSelected ? 'shadow-md' : ''}`}>
                                <div className="w-full px-2">
                                    <div className={`text-lg font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>{ListItem.id}</div>
                                    <span className={`text-gray-500 ${isSelected ? 'text-blue-500' : 'text-gray-500'}`}>{ListItem.chatTitle}</span>
                                </div>
                            </div>
                        </a>
                    );
                })}
                <button className=" inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2" onClick={HandleNewListItem}>
                    <svg className="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2" viewBox="0 0 12 12">
                        <path d="M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z" />
                    </svg>
                    <span>New Chat</span>
                </button>
            </div>
        </div>
    )
}