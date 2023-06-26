import { myAxiosAws } from '../services/helperAws';
import { useState, useEffect } from "react";
import * as React from 'react';
import { Stats } from '../utilities/Stats';
import { Loading } from '../utilities/Loading';
import { ServicesList } from '../HomePageComponents/ServicesList';


import { SidebarHome } from '../HomePageComponents/SidebarHome';
import { ApacePieChart } from '../utilities/ApacePieCharts';
import { BarChartComponent } from '../utilities/BarChart';



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
import PieChartIcon from '@material-ui/icons/PieChart';
import ChatIcon from '@material-ui/icons/Chat';


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

export const Home = () => {

    const [data, setData] = useState([]);
    const [pricedata, setPriceData] = useState({});
    const [prevMonthPrice, setPrevMonthPrice] = useState({});


    data.sort((a, b) => b.cost_per_month - a.cost_per_month);

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };




    useEffect(() => {
        const fetchData = async () => {
            try {
                const date = new Date();
                let month = date.getMonth();
                let year = date.getFullYear();
                if (month === 0) {
                    month = 12;
                    year = year - 1;
                }


                myAxiosAws.post("/configure", {
                    accessKey: localStorage.awsAccessKey,
                    secretKey: localStorage.awsSecretKey,
                    region: "eu-north-1"
                }).then((response) => response.data).then((response) => console.log(response));

                const response = await myAxiosAws.get("/total-cost");

                console.log(response);
                const prevMonthResponse = await myAxiosAws.get("/service-costs", { params: { year, month } });

                const costdata = response.data.costDetails;
                setPriceData({
                    totalCostPerHour: `${response.data.totalCostPerHour}`,
                    totalCostPerMonth: `${response.data.totalCostPerMonth}`,
                    totalCostPerYear: `${response.data.totalCostPerYear}`
                });
                setData(costdata);
                setPrevMonthPrice(prevMonthResponse.data["Total Cost"]["Total Cost"]);


            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const servicesArray = data.map((obj) => obj.service_name);
    const costData = data.map((obj) => obj.cost_per_month);
    return (
        <div>
            <Box sx={{ display: 'flex' }}>
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

                        <a href="/pie-chart-monthly-analysis">
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
                                        <PieChartIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Piechart Analysis" sx={{ opacity: open ? 1 : 0 }} />
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

                </Box>
            </Box>

            <div className='HomePage'>
                <div>
                    {data.length > 0 ? (<div> <Stats sumOfCostPerHour={pricedata.totalCostPerHour} sumOfCostPerMonth={pricedata.totalCostPerMonth} sumOfCostPerYear={pricedata.totalCostPerYear} prevMonthTotalCost={prevMonthPrice} open={open} />
                        <div className='HomePage__services'>
                            <ServicesList data={data} open={open}/>
                            <ApacePieChart servicesArray={servicesArray} costData={costData} />
                            {/* <PieChart servicesArray={servicesArray} costData={costData} /> */}
                            {/* <ViewServices Data={data} servicesArray={servicesArray} costData={costData} /> */}
                            {/* <Months /> */}
                        </div>

                        <BarChartComponent open={open}/>

                    </div>) : (<Loading />)}

                </div>

            </div>


        </div>
    )
}    