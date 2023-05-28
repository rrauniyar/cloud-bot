import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useState } from 'react';
export const ServicesList = (props) => {
    const [showAll, setShowAll] = useState(false);
    const [listSize, setListSize] = useState(5);
    const data = props.data;
    return (
        <div className='services__list'>
            <div>
                <strong style={{ marginLeft: '10px' }}>Most used Services</strong>
                <List sx={{ width: '100%', maxWidth: 1440, bgcolor: 'background.paper' }}>
                    {data.slice(0, listSize).map((obj, index) => (
                        <ListItem
                            key={index}
                            disableGutters
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                margin: '8px',
                                padding: '16px'
                            }}
                            secondaryAction={
                                <>
                                    <Typography variant="subtitle1" color="text.secondary" sx={{ mr: 1 }}>
                                        <strong> {obj.cost_per_month} $</strong>
                                    </Typography>
                                </>
                            }
                        >
                            <a title="Click for detailed Analysis" href={`/services/${obj.service_name}`} style={{
                                textDecoration: 'none',
                                color: 'blue',
                                fontWeight: '500',
                                ':hover': {
                                    color: 'purple',
                                    borderBottomColor: 'purple',
                                }
                            }}>
                                <ListItemText
                                    primary={`${obj.service_name}`}
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        lineHeight: '24px',
                                        marginBottom: '8px'
                                    }}
                                />
                            </a>
                        </ListItem>
                    ))}
                </List>
                <div>{!showAll ? (<Button variant="outlined" onClick={() => { setShowAll(!showAll); setListSize(data.length) }} sx={{
                    marginTop: '8px',
                    color: 'white',
                    marginLeft: '10px',
                    backgroundColor: 'blue',
                    borderRadius: '10px',
                    font: 'Roboto',
                    '&:hover': {
                        backgroundColor: 'darkblue',
                    },
                }}>show All</Button>) : (<div><Button variant="outlined" onClick={() => { setShowAll(!showAll); setListSize(5) }} sx={{
                    marginTop: '8px',
                    marginLeft: '10px',
                    color: 'white',
                    backgroundColor: 'blue',
                    borderRadius: '10px',
                    font: 'Roboto',
                    '&:hover': {
                        backgroundColor: 'darkblue',
                    },
                }}>show Less</Button> </div>)}</div>

            </div>
        </div>
    )
}