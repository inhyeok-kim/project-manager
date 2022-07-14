import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import ModalTaskRegistForm from "../../components/ModalTaskRegistForm";
import SelectMember from "../../components/SelectMember";
import TaskTable from "../../components/TaskTable";

export default function Tasks(){
    const [registIsOpen, setRegistIsOpen] = useState(false);
    function registOpen(){
        setRegistIsOpen(true);
    }
    function registClose(){
        setRegistIsOpen(false);
    }

    return (
        <Grid container>
            <Card sx={{width : '100%'}}>
                <Grid container justifyContent={"center"} marginTop={"20px"}>
                    <Grid xs={11}>
                        <Grid container>
                            <Grid xs={6}>

                            </Grid>
                            <Grid xs={6}>
                                <Grid container justifyContent={"right"}>
                                    <Button variant="contained" onClick={registOpen}>New</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <CardContent>
                    <TaskTable type={'person'} />
                </CardContent>
            </Card>

            <ModalTaskRegistForm isOpen={registIsOpen} onClose={registClose} />

        </Grid>
    )
}