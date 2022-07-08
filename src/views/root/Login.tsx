import { Button, Card, CardContent, CardHeader, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, Slide, Stack, TextField, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Login(){
    const navigate = useNavigate();

    const [remeber,setRemeber] = useState(false);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [open2, setOpen2] = useState(false);

    const handleClickOpen2 = () => {
      setOpen2(true);
    };
  
    const handleClose2 = () => {
      setOpen2(false);
    };


    return (
        <Grid 
            container
            justifyContent={"center"}
            alignItems={"center"}
            sx={{height : '100%'}}
        >
            <Grid item xs={6}>
                <Card>
                    <CardHeader title="PMA"
                    titleTypographyProps={{
                        textAlign : 'center',
                        fontSize : '4rem',
                        fontWeight : 'bold',
                        color : blueGrey[500]
                    }} />
                    <CardContent>
                        <Grid container justifyContent={"center"}>
                            <Grid item xs={6}>
                                <Typography align="center" variant="h5">Login</Typography>
                                <TextField margin="normal" fullWidth label="username" />
                                <TextField margin="normal" type={'password'} fullWidth label="password" />
                                <Grid item xs={12} sx={{marginTop : '3%'}}>
                                    <FormControlLabel
                                        label="Remember me"
                                        control={<Checkbox checked={remeber} onChange={(e)=>{setRemeber(e.target.checked)}} />}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{marginTop : '3%'}}>
                                    <Grid container>
                                        <Grid item xs={9}>
                                            <Stack direction="row" spacing={2}>
                                                <Button onClick={handleClickOpen}>Request to join</Button>
                                                <Button>find account</Button>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Stack justifyContent={"flex-end"} direction="row" spacing={2}>
                                                <Button variant="contained"
                                                    onClick={()=>{navigate('/dashboard')}}
                                                >Login</Button>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle>Please fill out to request a subscription</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        The manager will approve the subscription after confirmation.
                        <TextField margin="normal" fullWidth label="your name" />
                        <TextField margin="normal" type={"email"} fullWidth label="your email" />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClickOpen2}>Submit</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={open2}
                onClose={handleClose2}
            >
                <DialogTitle id="alert-dialog-title">
                {"Complete subscription request"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    The subscription request is complete. After approval to join, an email will be sent to your email. Thanks.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>{handleClose2(); handleClose()}} autoFocus>
                    confirm
                </Button>
                </DialogActions>
            </Dialog>

        </Grid>
    )
}