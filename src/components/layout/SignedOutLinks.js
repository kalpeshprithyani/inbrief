import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";
import LinearProgress from "@material-ui/core/LinearProgress";

const SignedOutLinks = () => {
    const [openUp, setOpenUp] = React.useState(false);
    const [openIn, setOpenIn] = React.useState(false);
    const handleClickOpenUp = () => {
        setOpenUp(true);
    };
    const handleCloseUp = () => {
        setOpenUp(false);
    };

    const handleClickOpenIn = () => {
        setOpenIn(true);
    };
    const handleCloseIn = () => {
        setOpenIn(false);
    };
    return (
        <ul style={{paddingLeft:0}}>
            <Button style={{marginRight:15}} onClick={handleClickOpenIn}>Log in</Button>
            <Button variant="outlined" color="secondary" onClick={handleClickOpenUp}>Get Started</Button>
            <Dialog
                open={openUp}
                onClose={handleCloseUp}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='md'
                PaperProps={{
                    style: {
                        position:'initial'
                    },
                }}
            >
                <SignUp handleClose={handleCloseUp}/>
            </Dialog>
            <Dialog
                open={openIn}
                onClose={handleCloseIn}
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
                maxWidth='md'
                PaperProps={{
                    style: {
                        position:'initial'
                    },
                }}
            >
                <SignIn handleClose={handleCloseIn}/>
            </Dialog>
        </ul>
    )
}

export default SignedOutLinks