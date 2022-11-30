import React, {Component, Fragment} from 'react'
import {canvasActiveCreateSectionAPI, canvasActiveSectionAPI, retrieveSectionInfoAPI} from "../../../utils/api/api";
import Typography from "@mui/material/Typography";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

class ActiveSectionContainer extends Component{
    state = {
        course_name:"",
        registered_section:null,
        unregistered_section:null
    }
    componentDidMount() {
        canvasActiveSectionAPI(this.props.id)
            .then((data)=>{
                this.setState({
                    course_name: data.course,
                    registered_section: data.recordedSection,
                    unregistered_section: data.unrecordedSection
                })
            })
    }
    handleAddButton = (e,id, name)=>{
        e.preventDefault()
        const body = {
            "name": name,
            "id": id
        }
        canvasActiveCreateSectionAPI(body, this.props.id)
            .then((r)=>{
                this.props.sectionSelected(r.section)
            })
    }
    handleEditButton = (e, id)=>{
        e.preventDefault()
        retrieveSectionInfoAPI(id)
            .then(r=>{
                this.props.sectionSelected(r.section)
            })
    }

    render() {
        if (this.state.course_name == ""){
            return <div>Loading</div>
        }
        console.log(this.state.registered_section)
        return(
            <>
                <div className={"card"}>
                    <div className={"card-header"}>
                        {this.state.course_name}
                    </div>
                </div>
                <Grid container spacing={3}>
                    <Grid item sm={12} xs={12} md={6}>
                        <div className={"card"}>
                            <div className={"card-header"}>
                                <Typography gutterBottom variant="h6" component="div">
                                    Unregistered sections
                                </Typography>
                            </div>
                            <div className={"card-body"}>
                                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align={"center"}>ID</TableCell>
                                            <TableCell align="center">Name</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.unregistered_section.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center" component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center">{row.name}</TableCell>
                                                <TableCell align="center">
                                                    <Button onClick={(e)=>this.handleAddButton(e,row.id, row.name)}>Add</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </Grid>
                    <Grid item sm={12} xs={12} md={6}>
                        <div className={"card"}>
                            <div className={"card-header"}>
                                <Typography gutterBottom variant="h6" component="div">
                                    Registered sections
                                </Typography>
                            </div>
                            <div className={"card-body"}>
                                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align={"center"}>ID</TableCell>
                                            <TableCell align="center">Name</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.registered_section.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center" component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center">{row.name}</TableCell>
                                                <TableCell align="center">
                                                    <Button onClick={(e)=>this.handleEditButton(e,row.id)}>Edit</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        m:2,
                        display: 'flex',
                        justifyContent: "center",
                    }}
                >
                    <Stack direction="row" spacing={2}>
                        <Button variant={"outlined"} onClick={this.props.prevStep}>Prev</Button>
                    </Stack>
                </Box>
            </>
        )
    }
}

export default ActiveSectionContainer