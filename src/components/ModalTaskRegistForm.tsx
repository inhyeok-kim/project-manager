import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useState } from "react";
import SelectMember from "./SelectMember";
import CloseIcon from '@mui/icons-material/Close';

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
    
    const [members, setMembers] = useState<Member[]>([]);

    return (

            <Dialog open={isOpen} onClose={registClose} fullWidth>
                <DialogTitle sx={{display:'flex',justifyContent:'space-between'}}>
                    New Task
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={registClose}
                        aria-label="close"
                        >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent >
                    <Grid item xs={12} sx={{marginTop : '2%'}}>
                        <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Task Title</Typography>
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
                        <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Project</Typography>
                        <FormControl >
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className="unselectCancel"
                                value={'1'}
                                sx={{minWidth:'120px'}}
                                // onChange={handleChange}
                                >
                                <MenuItem value='1'>Select Project</MenuItem>
                                <MenuItem className="unselectCancel" value={10}>Ten</MenuItem>
                                <MenuItem className="unselectCancel" value={20}>Twenty</MenuItem>
                                <MenuItem className="unselectCancel" value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{marginTop : '2%'}}>
                        <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Assignment</Typography>
                        <Grid container>
                            <Grid  item xs={10}>
                                <SelectMember deletable={false} value={members} onChange={setMembers} multiple={false}  />
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