import React, {Component, Fragment} from 'react'
import RegistrationContainer from "./containers/RegistrationContainer";
import NavbarContainer from "../../container/NavbarContainer";

class RegistrationPage extends Component{
    render() {
        return(
            <Fragment>
                <NavbarContainer/>
                <RegistrationContainer/>
            </Fragment>
        )
    }
}


export default RegistrationPage