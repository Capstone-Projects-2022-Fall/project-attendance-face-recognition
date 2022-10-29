import React, {Component, Fragment} from 'react'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {connect} from "react-redux";
import CardSummaryView from "../components/CardSummaryView";

class CardSummaryContainer extends Component{
    render() {
        return(
            <Container fixed>
                <Grid container spacing={3}>
                    <Grid item sm xs md={4}>
                        <CardSummaryView
                            title={"Course(s)"}
                            amount={1}
                        />
                    </Grid>
                    <Grid item sm xs md={4}>
                        <CardSummaryView
                            title={"Issue(s)"}
                            amount={2}
                        />
                    </Grid>
                    <Grid item sm xs md={4}>
                        <CardSummaryView
                            title={"Student(s)"}
                            amount={10}
                        />
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default connect()(CardSummaryContainer)