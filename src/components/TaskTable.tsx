import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
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

    const [searchProject,setSearchProject] = useState('');
    const [searchState,setSearchState] = useState('');
    const [searchCondition,setSearchCondition] = useState('');
    const [searchStart,setSearchStart] = useState(formatDateToString(new Date(), 'yyyy-mm-dd',true));
    const [searchEnd,setSearchEnd] = useState(formatDateToString(new Date(new Date().setDate(new Date().getDate()+7)), 'yyyy-mm-dd',true));
    function searchStartHandler(e:React.FormEvent){
        if(new Date(searchEnd) < new Date(e.target.value)){
            setSearchEnd(e.target.value);
        }
        setSearchStart(e.target.value);
    }
    function searchEndHandler(e:React.FormEvent){
        if(new Date(searchStart) > new Date(e.target.value)){
            setSearchStart(e.target.value);
        }
        setSearchEnd(e.target.value);
    }

    return (
        <Grid item xs={12}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        <FormControl sx={{margin:'0px 10px'}}>
                            <InputLabel id="select_project">project</InputLabel>
                            <Select
                                variant="standard"
                                sx={{minWidth:'100px'}}
                                labelId="select_project"
                                label="Project"
                                value={searchProject}
                                onChange={(e)=>{setSearchProject(e.target.value)}}
                                >
                                <MenuItem value=''>None</MenuItem>
                                <MenuItem value={1}>Project1</MenuItem>
                                <MenuItem value={2}>Project2long</MenuItem>
                                <MenuItem value={3}>Project3</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{margin:'0px 10px'}}>
                            <InputLabel id="select_status">status</InputLabel>
                            <Select
                                variant="standard"
                                sx={{minWidth:'100px'}}
                                labelId="select_status"
                                label="status"
                                value={searchState}
                                onChange={(e)=>{setSearchState(e.target.value)}}
                                >
                                <MenuItem value=''>None</MenuItem>
                                <MenuItem value={1}>Complete</MenuItem>
                                <MenuItem value={2}>Proceeding</MenuItem>
                                <MenuItem value={3}>Delayed</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{margin:'0px 10px'}}>
                            <TextField label=" " value={searchStart} onChange={searchStartHandler} variant="standard" type={"date"} />
                        </FormControl>
                        <FormControl sx={{margin:'0px 10px'}}>
                            <TextField label=" " value={searchEnd} onChange={searchEndHandler} variant="standard" type={"date"} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{textAlign:'right'}}>
                        <FormControl sx={{margin:'0px 10px'}}>
                            <InputLabel id="select_search_condition">condition</InputLabel>
                            <Select
                                variant="standard"
                                sx={{minWidth:'120px'}}
                                labelId="select_search_condition"
                                label="searchCondition"
                                value={searchCondition}
                                onChange={(e)=>{setSearchCondition(e.target.value)}}
                            >
                                <MenuItem value=''>None</MenuItem>
                                <MenuItem value={1}>Title</MenuItem>
                                <MenuItem value={2}>Assignment</MenuItem>
                                <MenuItem value={3}>requester</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="keyword" variant="standard" />
                        <FormControl sx={{margin:'0px 10px',paddingTop:'10px'}}>
                            <Button variant="contained" >
                                Search
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            {
                                type === 'person' ?
                                <TableCell>
                                    Project
                                    {/* <IconButton size="small">
                                        <HeightIcon fontSize="small" />
                                    </IconButton> */}
                                </TableCell>
                                :
                                ''
                            }
                            <TableCell>
                                Title
                                {/* <IconButton size="small">
                                    <HeightIcon fontSize="small" />
                                </IconButton> */}
                            </TableCell>
                            <TableCell align="right">
                                Assignment
                                {/* <IconButton size="small">
                                    <HeightIcon fontSize="small" />
                                </IconButton> */}
                            </TableCell>
                            <TableCell align="right">
                                requester
                                {/* <IconButton size="small">
                                    <HeightIcon fontSize="small" />
                                </IconButton> */}
                            </TableCell>
                            <TableCell align="right">
                                Start
                                {/* <IconButton size="small">
                                    <HeightIcon fontSize="small" />
                                </IconButton> */}
                            </TableCell>
                            <TableCell align="right">End
                                {/* <IconButton size="small">
                                    <HeightIcon fontSize="small" />
                                </IconButton> */}
                            </TableCell>
                            <TableCell align="right">Status
                                {/* <IconButton size="small">
                                    <HeightIcon fontSize="small" />
                                </IconButton> */}
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
            </Grid>
        </Grid>
    )
}