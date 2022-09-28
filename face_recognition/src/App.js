import logo from './logo.svg';
import './App.css';
import {Fragment} from "react";
import Navbar from "./component/Navbar"
import {Button} from "@mui/material";

function App() {
  return (
      <Fragment>
        <Navbar/>
        <div className="App">
          <header className="App-header">
            <h1>Attendance Face Recognition</h1>
            <p>
              Click on the button below to record your attendance
            </p>
              <Button variant="contained">
                  Record Attendance
              </Button>
          </header>
        </div>
      </Fragment>
  );
}

export default App;
