import React, {Component, Fragment} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../../component/Navbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ViewReportContainer from "./containers/ViewReportContainer";

class Configuration extends Component{
	render(){
		return(
			<Fragment>
				<CssBaseline />
				<Navbar/>
				<Container fixed>
					<ViewReportContainer/>
				</Container>
			</Fragment>
		)
	}
}

export default Configuration
