import React, {Fragment} from 'react';
import {Divider, List, ListItem, ListItemText} from "@mui/material";

export default function RecentUserComponent(props){
    return(
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
                <ListItemText primary="Jerry Maurice" secondary="Jan 9, 2014" />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText primary="John Maurice" secondary="Jan 9, 2014" />
            </ListItem>
        </List>
    )
}