import React, {Fragment, useEffect} from 'react'
import Box from "@mui/material/Box";
import Webcam from "react-webcam";

export const WebCamContainer = (props)=>{
    let webcamRef = React.useRef(null);
    let [imgSrc, setImgSrc] = React.useState(null);

    useEffect(()=>{
        if (props.numPic<2){
            const interval = setInterval(()=>{
                capture()
                console.log("5 seconds")
                props.nextStep()
            }, 1000*5)
            return () => clearInterval(interval)
        }
    },[props.numPic])

    const capture = React.useCallback(()=>{
        let imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        props.onChangeValue(imageSrc)
    },[webcamRef, setImgSrc])
    return(
        <Fragment>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 0.5,
                    bgcolor: '#494e5e',
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
        </Fragment>
    )
}