import React from 'react'
import {Button, FormControl, FormHelperText, InputLabel, OutlinedInput, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function AddScheduleComponent(props){
    return(
        <>
            <div className={"card"}>
                <div className={"card-header"}>
                    Add Schedule
                </div>
                <div className={"card-body"}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl fullWidth sx={{
                            m: 1,
                            width: '60ch'
                        }}>
                            <InputLabel htmlFor="Selected Section">Selected Section:</InputLabel>
                            <OutlinedInput
                                id="section_to_update"
                                label="Section to update:"
                                type={"text"}
                                value={props.section.name}
                                disabled
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{
                            m: 1,
                            width: '60ch'
                        }}>
                            <InputLabel>Day of the Week</InputLabel>
                            <Select
                                label={"weekday"}
                                value={props.object.weekday}
                                onChange={(e)=>props.onChangeValue(e,"weekday")}
                            >
                                <MenuItem value={"0"}>Monday</MenuItem>
                                <MenuItem value={"1"}>Tuesday</MenuItem>
                                <MenuItem value={"2"}>Wednesday</MenuItem>
                                <MenuItem value={"3"}>Thursday</MenuItem>
                                <MenuItem value={"4"}>Friday</MenuItem>
                                <MenuItem value={"5"}>Saturday</MenuItem>
                                <MenuItem value={"6"}>Sunday</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{
                            m: 1,
                            width: '60ch',
                        }}>
                            <InputLabel></InputLabel>
                            <input
                                id="start_time"
                                type={"time"}
                                style={{fontSize:20}}
                                value={props.object.start_time}
                                onChange={(e)=>props.onChangeValue(e,"start_time")}
                            />
                            <FormHelperText id="component-helper-text">
                                Start time of the class
                            </FormHelperText>
                        </FormControl>
                        <FormControl fullWidth sx={{
                            m: 1,
                            width: '60ch'
                        }}>
                            <InputLabel></InputLabel>
                            <input
                                id="start_time"
                                type={"time"}
                                style={{fontSize:20}}
                                value={props.object.end_time}
                                onChange={(e)=>props.onChangeValue(e,"end_time")}
                            />
                            <FormHelperText id="component-helper-text">
                                End time of the class
                            </FormHelperText>
                        </FormControl>
                        <FormControl fullWidth sx={{
                            m: 1,
                            width: '60ch'
                        }}>
                            <InputLabel htmlFor="Duration">Duration</InputLabel>
                            <OutlinedInput
                                id="duration"
                                label="Duration:"
                                type={"number"}
                                min={"0"}
                                value={props.object.duration}
                                onChange={(e)=>props.onChangeValue(e,"duration")}
                            />
                            <FormHelperText id="component-helper-text">
                                How long after class start is the student marked late
                            </FormHelperText>
                        </FormControl>
                    </Box>
                </div>
            </div>
            <Box
                sx={{
                    m:2,
                    display: 'flex',
                    justifyContent: "center",
                }}
            >
                <Stack direction="row" spacing={2}>
                    <Button variant={"outlined"} onClick={props.prevStep}>Prev</Button>
                    <Button variant={"outlined"} color={"success"} onClick={props.onSubmit}>Add Schedule</Button>
                </Stack>
            </Box>
        </>
    )
}