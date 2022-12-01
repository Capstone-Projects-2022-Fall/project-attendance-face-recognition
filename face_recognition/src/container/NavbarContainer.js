import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Navbar from "../component/Navbar";

class NavbarContainer extends Component{
    render() {
        return(
            <Navbar
                professor={this.props.isInstructor.instructor}
            />
        )
    }
}
function mapStateToProps({isInstructor}){
    console.log(isInstructor)
    return{
        isInstructor
    }
}

export default connect(mapStateToProps)(NavbarContainer)