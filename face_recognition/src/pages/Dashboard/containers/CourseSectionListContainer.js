import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import Grid from "@mui/material/Grid";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";


class CourseSectionListContainer extends Component{

    render(){
        return(
            <Fragment>
                <Grid container spacing={3}>
                    <Grid item sm xs md={5}>
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                            Project in CS
                        </Typography>
                    </Grid>
                    <Grid item sm xs md={5}>
                        <List>
                            <ListItemButton>
                                <ListItemText
                                    primary="Single-line item"
                                    secondary={""}
                                />
                                <ListItemButton role={undefined} dense>
                                    <ListItemIcon>
                                        <DeleteIcon/>
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemText
                                    primary="Single-line item"
                                    secondary={"M:9-10; W:12-1"}
                                />
                                <ListItemButton role={undefined} dense>
                                    <ListItemIcon>
                                        <DeleteIcon/>
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItemButton>
                        </List>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default connect()(CourseSectionListContainer)