import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#37474F',
        color: '#FFFFFF',
    },
    toolbar: {
        ...theme.mixins.toolbar,
        paddingLeft: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
    },
    listItemText: {
        fontSize: '1rem',
    },
    listItem: {
        paddingLeft: theme.spacing(4),
        '&.Mui-selected': {
            backgroundColor: '#455A64',
            '&:hover': {
                backgroundColor: '#455A64',
            },
        },
        '&:hover': {
            backgroundColor: '#455A64',
        },
    },
}));

export const SideNavbar = () => {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar}>
                <h3>Side Navbar</h3>
            </div>
            <List>
                <Link to="/viewservices">
                    <ListItem button classes={{ root: classes.listItem }} selected>
                        <ListItemText
                            primary="Table Stats"
                            classes={{ primary: classes.listItemText }}
                        />
                    </ListItem>
                </Link>
                <Link to="/monthly-analysis">
                    <ListItem button classes={{ root: classes.listItem }}>
                        <ListItemText
                            primary="Monthly Analysis"
                            classes={{ primary: classes.listItemText }}
                        />
                    </ListItem>
                </Link>
                <Link to="/pie-chart-monthly-analysis">
                    <ListItem button classes={{ root: classes.listItem }}>
                        <ListItemText
                            primary="Pie chart Monthly Analysis"
                            classes={{ primary: classes.listItemText }}
                        />
                    </ListItem>
                </Link>
            </List>
        </Drawer>
    );
}

