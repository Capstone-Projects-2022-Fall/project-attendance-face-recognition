import React, {Component, Fragment} from 'react'
import RegistrationContainer from "./containers/RegistrationContainer";
import Navbar from "../../component/Navbar";

class RegistrationPage extends Component{
    render() {
        return(
            <Fragment>
                <Navbar/>
                <RegistrationContainer/>
            </Fragment>
        )
    }
}


export default RegistrationPage