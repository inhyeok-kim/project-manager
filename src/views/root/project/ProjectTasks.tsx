import { Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useState } from "react";
import TaskTable from "../../../components/TaskTable";

export default function ProjectTasks(){

    return (
        <Grid container>
            <Card sx={{width : '100%'}}>
                <CardContent>
                    <TaskTable  type={'project'} />
                </CardContent>
            </Card>
        </Grid>
    )
}