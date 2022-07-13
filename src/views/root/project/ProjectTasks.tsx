import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useState } from "react";
import TaskTable from "../../../components/TaskTable";

export default function ProjectTasks(){

    return (
        <Grid container>
            <TaskTable />
        </Grid>
    )
}