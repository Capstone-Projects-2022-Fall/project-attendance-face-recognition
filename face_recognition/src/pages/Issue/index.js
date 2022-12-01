import React, {Component, Fragment} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AddIssueContainer from "./containers/AddIssueContainer";
import NavbarContainer from "../../container/NavbarContainer";

class IssuePage extends Component {
    render(){
		return(
			<Fragment>
				<CssBaseline/>
				<NavbarContainer/>
				<Container fixed>
					<AddIssueContainer/>
				</Container>
			</Fragment>
		)
    }
}

export default IssuePage
