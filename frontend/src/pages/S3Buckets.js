import { useEffect, useState } from "react"
import { myAxiosAws } from '../services/helperAws';
import { TableInstances } from "../utilities/TableInstances";
import { Loading } from '../utilities/Loading'
import { SidebarHome } from "../HomePageComponents/SidebarHome";
import { myAxiosDs } from "../services/helperDs";
import { Discuss } from "react-loader-spinner";
import { S3TableResponse } from '../utilities/S3TableResponse';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AWSIcon from 'react-aws-icons/dist/aws/logo/AWS';
import EC2Icon from 'react-aws-icons/dist/aws/logo/EC2';
import S3Icon from 'react-aws-icons/dist/aws/logo/S3'
import RDSIcon from 'react-aws-icons/dist/aws/logo/RDS'
import GraphicEq from '@material-ui/icons/GraphicEq';
import ChatIcon from '@material-ui/icons/Chat';
import { ReducedListS3 } from "../utilities/ReducedListS3";

export const S3Buckets = () => {

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
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };




    const [Data, setData] = useState([]);
    const [optimizedData, setOptimizedData] = useState("");
    const [reducedData, setReducedData] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            await myAxiosAws.post("/s3/configure/access", {
                accessKey: localStorage.awsAccessKey,
                secretKey: localStorage.awsSecretKey,
                region: "eu-north-1"
            }).then((response) => response.data).then((response) => console.log(response));

            try {
                const response = await myAxiosAws.get("/s3/buckets-details").then((response) => response.data).then((response) => {
                    console.log(response);
                    setData(response);
                });
                console.log(response);
            } catch (error) {
                console.log(error);
            }

        }
        fetchData();
    }, [])



    const stringifyDataOptimized = JSON.stringify(Data);



    async function HandleOptimize() {
        setOptimizedData("loading");
        const response = await myAxiosDs.post("/chat", {
            role: "AWS_cost_optimization",
            message: stringifyDataOptimized
        }).then((response) => response.data).then((response) => {
            setOptimizedData(response.text);
            console.log(response);
        });

        console.log(response);
    }

    async function HandleReduce() {
        setReducedData("loading");
        const response = await myAxiosDs.post("/chat", {
            role: "AWS_cost_reduction",
            message: stringifyDataOptimized
        }).then((response) => response.data).then((response) => {
            setReducedData(response.text);
            console.log(response);
        });

        console.log(response);
    }



    const tableInstance = TableInstances(Data);

    console.log(tableInstance);

    const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, prepareRow, canNextPage, canPreviousPage, pageOptions, state, gotoPage, pageCount, setPageSize } = tableInstance;


    console.log(reducedData);



    const tableResponseObject = reducedData && reducedData !== "loading" ? JSON.parse(reducedData) : null;




    return (
        <div className="s3-buckets">
            {Data.length > 0 ? (<Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} style={{ background: 'black' }}>
                    <Toolbar>
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
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <a href="/home">
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >

                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <AWSIcon />
                                    </ListItemIcon>

                                    <ListItemText primary="HomePage" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </a>
                        <a href="/EC2Instances/per-day">
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >

                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <EC2Icon />
                                    </ListItemIcon>

                                    <ListItemText primary="EC2" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>


                            </ListItem>
                        </a>


                        <a href="/s3Buckets">
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >

                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <S3Icon />
                                    </ListItemIcon>

                                    <ListItemText primary="S3 " sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </a>

                        <a href="/rds">
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <RDSIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="RDS" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </a>
                    </List>

                    <Divider />
                    <List>
                        <a href="/month-to-month-analysis">
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <GraphicEq />
                                    </ListItemIcon>
                                    <ListItemText primary="Bar graph analysis" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </a>



                        <a href="/Bill">
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <AttachMoneyIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="View Bills" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </a>
                        <a href="/chat/0">
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ChatIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Chatbot" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </a>
                    </List>

                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <div >

                        <table  {...getTableProps()} className="table">
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th  {...column.getHeaderProps(column.getSortByToggleProps())} className="table-header">
                                                {column.render("Header")}
                                                <span>
                                                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} className="table-row">
                                            {row.cells.map((cell) => {
                                                return <td {...cell.getCellProps()} className="table-cell">{cell.render("Cell")}</td>;
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <div className="page-selector">
                            <span>
                                Page {' '}
                                <strong>
                                    {state.pageIndex + 1} of {pageOptions.length}
                                </strong>
                            </span>
                            <select value={state.pageSize} onChange={(e) => (
                                setPageSize(e.target.value)
                            )}>{
                                    [10, 25, 40].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            show {pageSize}
                                        </option>
                                    ))
                                }

                            </select>
                            <div className="button-group">

                                <button className="green focus dark" style={{ margin: "0" }} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'} </button>
                                <button className="green focus dark" style={{ margin: "0" }} onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}  </button>
                                <button className="green focus dark" style={{ margin: "0" }} onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
                                <button className="green focus dark" style={{ margin: "0" }} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                                <div style={{ marginTop: '10px' }}><strong style={{ marginLeft: '20px' }}> go to page:</strong></div>
                                <input
                                    type="number"
                                    defaultValue={state.pageIndex + 1}
                                    onChange={e => {
                                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                        gotoPage(pageNumber)
                                    }}
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />



                            </div>
                        </div>

                        <div className="optimization-buttons">

                            <div className="optimization">
                                <ReducedListS3 data={Data}/>
                            </div>

                            <div className="optimization">
                                <button className="green focus dark" style={{ marginTop: "60px", marginLeft: "0", height: "50px", width: "100px" }} onClick={HandleReduce}>Optimize</button>

                                {reducedData === null ? (
                                    <div>

                                    </div>
                                ) : (
                                    <div>
                                        {reducedData === "loading" ? (
                                            <div>
                                                <Discuss />
                                            </div>
                                        ) : (
                                            <div className="optimizedData">
                                                <S3TableResponse data={tableResponseObject} />
                                            </div>

                                        )}
                                    </div>
                                )}
                            </div>

                        </div>


                    </div >
                </Box>
            </Box>) : (<Loading />)}



        </div>
    )
}






