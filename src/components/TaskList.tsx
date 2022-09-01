import { Button, FormControl, Grid, Icon, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import { formatDateToString } from "../utils/FormatUtil";

interface TastDataType {
    task: string,
    assignment: string,
    request: string,
    start: string,
    end: string,
    status : string,
}
function createData(
    task: string,
    assignment: string,
    request: string,
    start: string,
    end: string,
    status : string,
    ) {
    return { task, assignment, request, start, end, status };
}

const rows = [
    createData('Frozen yoghurt', 'username', 'username', '2022-07-01', '2022-07-05', 'Complete'),
    createData('Ice cream sandwich', 'username', 'username', '2022-07-01', '2022-07-05', 'Proceeding'),
    createData('Eclair', 'username', 'username', '2022-07-01', '2022-07-05', 'Proceeding'),
    createData('Cupcake', 'username', 'username', '2022-07-01', '2022-07-05', 'Complete'),
    createData('Gingerbread', 'username', 'username', '2022-07-01', '2022-07-05', 'Delayed'),
    createData('Gingerbread', 'username', 'username', '2022-07-01', '2022-07-05', 'Delayed'),
    createData('Gingerbread', 'username', 'username', '2022-07-01', '2022-07-05', 'Delayed'),
    createData('Gingerbread', 'username', 'username', '2022-07-01', '2022-07-05', 'Delayed'),
    createData('Gingerbread', 'username', 'username', '2022-07-01', '2022-07-05', 'Delayed'),
    createData('Gingerbread', 'username', 'username', '2022-07-01', '2022-07-05', 'Delayed'),
];

interface propType {
    type : 'person' | 'project'
}
export default function TaskList({
    type
}:propType){

    const [page, setPage] = useState(0);
    function handleChangePage(e:any,newPage:number){
        setPage(newPage);
    }
    const [rowsPerPage, setRowsPerPage] = useState(3);
    function handleChangeRowsPerPage(e : any){
        setRowsPerPage(parseInt(e.target.value));
    }

    return (
        <Grid item xs={12}>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {
                                type === 'person' ?
                                <TableCell>
                                    Project
                                </TableCell>
                                :
                                ''
                            }
                            <TableCell>
                                Title
                            </TableCell>
                            {
                                type === 'person' ?
                                    ''
                                :
                                <TableCell align="right">
                                    Assignment
                                </TableCell>
                            }
                            <TableCell align="right">
                                Start
                            </TableCell>
                            <TableCell align="right">End
                            </TableCell>
                            <TableCell align="right">Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{overflow:'auto'}}>
                    {(rowsPerPage > 0
                        ? rows.slice(0,10)
                        : rows
                    ).map((row) => (
                        <TableRow
                            key={row.task}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {
                                type === 'person' ?
                                <TableCell>
                                    ProjectName
                                </TableCell>
                                :
                                ''
                            }
                            <TableCell component="th" scope="row">
                                {row.task}
                            </TableCell>
                            {
                                type === 'person' ?
                                    ''
                                :
                                    <TableCell align="right">{row.assignment}</TableCell>
                            }
                            <TableCell align="right">{row.start}</TableCell>
                            <TableCell align="right">{row.end}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}