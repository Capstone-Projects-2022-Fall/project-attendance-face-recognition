import React, {Fragment, useEffect} from 'react'
import Box from "@mui/material/Box";
import Webcam from "react-webcam";
import {Button} from "@mui/material";

export default function WebcamComponent(props){
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        props.onChangeValue(imageSrc)
    }, [webcamRef, setImgSrc]);

    return(
        <Fragment>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                }}
            >
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width="100%"
                    height="auto"
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                }}
            >
                <Button variant="contained" color={"info"} onClick={capture}>
                    Take Snapshot
                </Button>
            </Box>
        </Fragment>
    )
}
