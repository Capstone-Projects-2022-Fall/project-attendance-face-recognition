import React, {Component, Fragment} from 'react'
import Grid from "@mui/material/Grid";
import {connect} from "react-redux";


class AddClassContainer extends Component{
    render() {
        return(
            <Fragment>
                <Grid container spacing={3}>
                    <Grid item sm xs md={4}>
                        <div className={"card"}>
                            <div className={"card-header"}>
                                Course
                            </div>
                            <div className={"card-body"}>

                            </div>
                        </div>
                    </Grid>
                    <Grid item sm xs md={4}>
                        <div className={"card"}>
                            <div className={"card-header"}>
                                Section
                            </div>
                            <div className={"card-body"}>

                            </div>
                        </div>
                    </Grid>
                    <Grid item sm xs md={4}>
                        <div className={"card"}>
                            <div className={"card-header"}>
                                Schedule
                            </div>
                            <div className={"card-body"}>

                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default connect()(AddClassContainer)