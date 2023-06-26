
import { useEffect, useState } from "react";
import { myAxiosDs } from '../services/helperDs';
import { myAxios } from "../services/helper";
import { ChatOutput } from "../utilities/ChatOutput";
import { useParams } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import { SideDrawerForChat } from "./SideDrawerForChat";
export const ChatScreen = () => {
    const [input, setInput] = useState("");
    const [chatList, setChatList] = useState([]);
    const [Data, setData] = useState([]);
    const [titleText, setTitleText] = useState("");
    const [buttonDisable, setButtonDisable] = useState("false");
    const [roleSelect, setRoleSelect] = useState("AWS");

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


    let title = "";


    async function SubmitHandler() {
        if (buttonDisable === false) {
            return;
        }
        setButtonDisable(false);
        const sendDatatoApi = {
            userInput: input,
            serverResponse: "loading",
            id: parseInt(index) + 1

        }

        setData([...Data, sendDatatoApi]);

        



        const response = await myAxiosDs.post("/chat", {
            role: roleSelect,
            message: input,
        }).then((response) => response.data).then((response) => {
            console.log(response);
            setButtonDisable(true);
            setTitleText(response.text);
            setData((prevData) => {
                const updatedData = [...prevData];
                const loadingIndex = updatedData.findIndex((message) => message.serverResponse === "loading");
                if (loadingIndex !== -1) {
                    updatedData[loadingIndex].serverResponse = response;
                }

                return updatedData;
            });

        });
        title = titleText;
        setInput("");


    }

    const handleAws = () => {
        setRoleSelect('AWS');
    };

    const handleGcp = () => {
        setRoleSelect('GCP');
    };

    const handleAzure = () => {
        setRoleSelect('AZURE');
    };

    return (


        <div className="chat dark">
            {/* <SideBarForChat index={index} title={title} /> */}
            <SideDrawerForChat index={index} />
            {!(chatList.length === 0 || chatList[0].length === 0) ? (
                <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen dark:bg-gray-900">

                    <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                        <ChatOutput message={Data} />

                    </div>
                    <div>

                        <div className="role-select">
                            <span>Select your Role:</span>
                            <div className="role-select-button-group">
                                <button
                                    onClick={handleAws}
                                    className={roleSelect === 'AWS' ? 'button-selected' : 'button-not-selected'}
                                >
                                    AWS
                                </button>
                                <button
                                    onClick={handleGcp}
                                    className={roleSelect === 'GCP' ? 'button-selected' : 'button-not-selected'}
                                >
                                    GCP
                                </button>
                                <button
                                    onClick={handleAzure}
                                    className={roleSelect === 'AZURE' ? 'button-selected' : 'button-not-selected'}
                                >
                                    Azure
                                </button>
                            </div>
                        </div>
                        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0 dark:border-gray-700">
                            <div className="relative flex">
                                <input
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            SubmitHandler();
                                        }
                                    }}
                                    onChange={(e) => setInput(e.target.value)}
                                    value={input}
                                    placeholder="Write your message!"
                                    className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:bg-gray-600"
                                    style={{ paddingRight: '8.5rem' }} // Add this style to create space for the button
                                />
                                <div className="absolute right-0 top-0 bottom-0 flex items-center px-0">
                                    <button
                                        onClick={SubmitHandler}
                                        type="button"
                                        disabled={!buttonDisable}
                                        className="inline-flex items-center justify-center rounded-lg p-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none dark:bg-blue-700 dark:hover:bg-blue-600"
                                    >
                                        <SendIcon />
                                    </button>
                                </div>
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


