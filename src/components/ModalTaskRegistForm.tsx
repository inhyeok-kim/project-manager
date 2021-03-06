import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useState } from "react";
import SelectMember from "./SelectMember";

interface propType {
    isOpen : boolean
    onClose : Function
}
export default function ModalTaskRegistForm({
    isOpen, onClose
}:propType){

    function registClose(){
        onClose();
    }
    
    const [memberId, setMemberId] = useState(['member01']);

    return (

            <Dialog open={isOpen} onClose={registClose} fullWidth>
                <DialogTitle>New Task</DialogTitle>
                <DialogContent >
                    <Grid item xs={12} sx={{marginTop : '2%'}}>
                        <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Task Name</Typography>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{marginTop : '2%'}}>
                        <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Assignment</Typography>
                        <Grid container>
                            <Grid xs={10}>
                                <SelectMember deletable={false} value={memberId} onChange={setMemberId} multiple={false}  />
                            </Grid>
                            <Button variant="contained">Self</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{marginTop : '2%'}}>
                        <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Task Description</Typography>
                        <TextField multiline minRows={3} margin="dense" fullWidth variant="outlined" />
                    </Grid>
                    <Grid container columnSpacing={3} sx={{marginTop : '2%'}}>
                        <Grid item xs={6}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Start Date</Typography>
                            <TextField fullWidth type={"date"} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">End Date</Typography>
                            <TextField fullWidth type={"date"} />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={registClose}>Cancel</Button>
                    <Button onClick={registClose}>Save</Button>
                </DialogActions>
            </Dialog>
    )
}