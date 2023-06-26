
import { useState } from "react";
import { myAxios } from "../services/helper";
import { useEffect } from "react"
import PlusIcon from '@material-ui/icons/Add';



export const SideBarForChat = (props) => {



    const [searchInput, setSearchInput] = useState("");

    const [index, setIndex] = useState(0);

    const [chatList, setChatList] = useState([]);

    let selectedIndex = -1;





    if (props.index) {
        selectedIndex = parseInt(props.index);

    }




    useEffect(() => {
        fetchInitailData();
    }, []);

    function fetchInitailData() {
        const chatListData = myAxios.get("/auth/all-chats").then((response) => response.data).then((response) => {
            console.log(response);
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
            chatTitle: "New chat"
        }

        const responseFromNewListIemApi = myAxios.post("/auth/create-chat", sendDatatoListApi).then((response) => response.data).then((response => {
            console.log(response);
            createChat(response.chatId);
            setIndex(response.chatId);


        })).catch((error) => {
            console.log(error);
        });

        console.log(responseFromNewListIemApi);



    }



    const filteredChatList = chatList.filter(chat => { return (chat.chatTitle.toLowerCase().includes(searchInput.toLowerCase())) });

    return (


        <div className="flex bg-gray-900">
            <div className="flex flex-col border-r-2 overflow-y-auto  border-gray-700 ">
                <div className="border-b-2 py-6 px-2 flex items-center  border-gray-700 ">
                    <input
                        type="text"
                        placeholder="search chatting"
                        className="py-2 px-2 border-2 border-gray-700 rounded-2xl w-full text-gray-200 bg-gray-800 mr-2"
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button className="flex items-center justify-center rounded-full w-10 h-10 focus:outline-none focus-visible:ring-2  bg-gray-400" onClick={HandleNewListItem}>
                        <PlusIcon />
                    </button>
                </div>

                {filteredChatList.map((ListItem, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                        <a href={`/chat/${index}`} key={index}>
                            <div
                                className={`flex flex-row py-4 px-2 justify-center items-center border-b-2  ${isSelected ? "border-blue-300 shadow-md" : "border-transparent"
                                    }`}
                            >
                                <div className="w-full px-2">
                                    <div
                                        className={`text-lg font-semibold ${isSelected ? "text-blue-700" : "text-gray-300"
                                            }`}
                                    >
                                        {ListItem.id}
                                    </div>
                                    <span
                                        className={`text-gray-500 ${isSelected ? "text-blue-500" : "text-gray-500"
                                            }`}
                                    >
                                        {ListItem.chatTitle}
                                    </span>
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>



    )
}