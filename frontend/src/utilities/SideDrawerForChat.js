import { useState, useEffect } from "react";
import * as React from 'react';
import { myAxios } from "../services/helper";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import AddCommentIcon from '@mui/icons-material/AddComment';
import { Button } from "@material-ui/core";



export const SideDrawerForChat = (props) => {
    const drawerWidth = 240;

    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );

    const [index, setIndex] = useState(0);

    const [chatList, setChatList] = useState([]);



    let selectedIndex = -1;



    if (props.index) {
        selectedIndex = parseInt(props.index);

    }


    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


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






    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} style={{ background: 'black' }}>
                <Toolbar  >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <a href="/home">
                        <Typography variant="h6" noWrap component="div">
                            CloudBot
                        </Typography>
                    </a>


                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} PaperProps={{
                sx: {
                    backgroundColor: "black",
                    color: "white",
                }
            }}>


                <Button variant="text" style={{ border: '2px solid ', color: 'white', borderColor: "hsla(0,0%,100%,.2)", borderWidth: "1px", borderRadius: " 0.375rem", display: 'flex', marginTop: "15px" }} onClick={HandleNewListItem}>
                    <AddCommentIcon style={{ marginRight: "12px" }} />
                    Add chat
                </Button>


                <List >


                    {chatList.map((ListItem, index) => {
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
                </List>



            </Drawer>

        </Box>
    )
}