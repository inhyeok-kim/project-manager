import { Grid, Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from "@mui/material";
import { useState } from "react";
import HeightIcon from '@mui/icons-material/Height';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

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
];

interface propType {
    type : 'person' | 'project'
}
export default function TaskTable({
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
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    {
                        type === 'person' ?
                        <TableCell>
                            Project
                            <IconButton size="small">
                                <HeightIcon fontSize="small" />
                            </IconButton>
                        </TableCell>
                        :
                        ''
                    }
                    <TableCell>
                        Task
                        <IconButton size="small">
                            <HeightIcon fontSize="small" />
                        </IconButton>
                    </TableCell>
                    <TableCell align="right">
                        Assignment
                        <IconButton size="small">
                            <HeightIcon fontSize="small" />
                        </IconButton>
                    </TableCell>
                    <TableCell align="right">
                        requester
                        <IconButton size="small">
                            <HeightIcon fontSize="small" />
                        </IconButton>
                    </TableCell>
                    <TableCell align="right">
                        Start
                        <IconButton size="small">
                            <HeightIcon fontSize="small" />
                        </IconButton>
                    </TableCell>
                    <TableCell align="right">End
                        <IconButton size="small">
                            <HeightIcon fontSize="small" />
                        </IconButton>
                    </TableCell>
                    <TableCell align="right">Status
                        <IconButton size="small">
                            <HeightIcon fontSize="small" />
                        </IconButton>
                    </TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                        <TableCell align="right">{row.assignment}</TableCell>
                        <TableCell align="right">{row.request}</TableCell>
                        <TableCell align="right">{row.start}</TableCell>
                        <TableCell align="right">{row.end}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[1, 3, 5]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    )
}