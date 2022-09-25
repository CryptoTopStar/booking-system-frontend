import React from "react"
import { CircularProgress, Backdrop } from "@mui/material";


const Progress = ({ processing }) => {
    return (
        <>
            {!!processing && (
                <Backdrop style={{ zIndex: 1, color: '#fff' }} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
        </>);
}

export default Progress