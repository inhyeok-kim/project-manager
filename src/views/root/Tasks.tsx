import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import TaskTable from "../../components/TaskTable";

export default function Tasks(){

    return (
        <Grid container>
            <TaskTable />
        </Grid>
    )
}