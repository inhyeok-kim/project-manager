import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyTaskList, getProjectTaskList } from "../api/Task";
import { formatDateToString } from "../utils/FormatUtil";
import SelectProject from "./SelectProject";

interface propType {
    type : 'person' | 'project'
    prId? : string
    onClick : Function
}

export default function TaskTable({
    type,
    prId = '',
    onClick
}:propType){
    
    const [searchCondition, setSearchCondition] = useState({
        taskTitle : '',
        assignName : '',
        page : 0,
        perPage : 5,
        prId : prId,
        status : '' as "P" | "S" | "D" | "E" | undefined,
        startDt : formatDateToString(new Date(), 'yyyy-mm-dd',true),
        endDt : formatDateToString(new Date(new Date().setDate(new Date().getDate()+7)), 'yyyy-mm-dd',true),
    });
    const {taskList, taskListCnt,refetch} = useTaskList(type,searchCondition);
    useEffect(()=>{
        refetch();
    },[searchCondition])

    function handleChangePage(e:any,newPage:number){
        const search = {...searchCondition};
        search.page = newPage;
        setSearchCondition(search);
    }
    function handleChangeRowsPerPage(e : any){
        const search = {...searchCondition};
        search.perPage = parseInt(e.target.value);
        setSearchCondition(search);
    }

    function setSearchProject(e:ChangeEvent<HTMLInputElement>){
        const search = {...searchCondition};
        search.prId = e.target.value;
        search.page = 0;
        setSearchCondition(search);
    }

    function setSearchState(value:'P'|'S'|'E'|undefined){
        const search = {...searchCondition};
        search.status = value;
        search.page = 0;
        setSearchCondition(search);
    }

    
    function searchStartHandler(e:ChangeEvent<HTMLInputElement>){
        const search = {...searchCondition};
        if(new Date(searchCondition.endDt) < new Date(e.target.value)){
            search.endDt = e.target.value;
        }
        search.startDt = e.target.value;
        search.page = 0;
        setSearchCondition(search);
    }
    function searchEndHandler(e:ChangeEvent<HTMLInputElement>){
        const search = {...searchCondition};
        if(new Date(searchCondition.startDt) > new Date(e.target.value)){
            search.startDt = e.target.value;
        }
        search.endDt = e.target.value;
        search.page = 0;
        setSearchCondition(search);
    }
    const [keywordType,setKeywordType] = useState('T');
    const [keyword, setKeyword] = useState('');
    function fnSearchKeyword(){
        const search = {...searchCondition};
        switch (keywordType) {
            case "T":
                search.taskTitle = keyword;
                search.assignName = '';
                search.page = 0;
                setSearchCondition(search);
                break;
            case "A":
                search.assignName = keyword;
                search.taskTitle = '';
                search.page = 0;
                setSearchCondition(search);
                break;
        }
    }

    return (
        <Grid item xs={12}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        {
                            type === "person" ? 
                                <FormControl sx={{margin:'0px 10px'}}>
                                    <InputLabel id="select_project">project</InputLabel>
                                    <SelectProject value={searchCondition.prId}
                                        onChange={setSearchProject}
                                        variant={"standard"}
                                    />
                                </FormControl>
                            :
                            ''
                        }
                        <FormControl sx={{margin:'0px 10px'}}>
                            <InputLabel id="select_status">status</InputLabel>
                            <Select
                                variant="standard"
                                sx={{minWidth:'100px'}}
                                labelId="select_status"
                                label="status"
                                value={searchCondition.status}
                                onChange={(e)=>{setSearchState(e.target.value)}}
                                >
                                <MenuItem value=''>None</MenuItem>
                                <MenuItem value={'P'}>Proceeding</MenuItem>
                                <MenuItem value={'S'}>Stopped</MenuItem>
                                <MenuItem value={'E'}>End</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{margin:'0px 10px'}}>
                            <TextField label=" " value={searchCondition.startDt} onChange={searchStartHandler} variant="standard" type={"date"} />
                        </FormControl>
                        <FormControl sx={{margin:'0px 10px'}}>
                            <TextField label=" " value={searchCondition.endDt} onChange={searchEndHandler} variant="standard" type={"date"} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{textAlign:'right'}}>
                        <FormControl sx={{margin:'0px 10px'}}>
                            <InputLabel id="select_search_condition">condition</InputLabel>
                            <Select
                                variant="standard"
                                sx={{minWidth:'120px'}}
                                labelId="select_search_condition"
                                value={keywordType}
                                onChange={(e)=>{setKeywordType(e.target.value)}}
                            >
                                <MenuItem value={'T'}>Title</MenuItem>
                                {type === "project" ?
                                    <MenuItem value={'A'}>Assignment</MenuItem>
                                    :''
                                }
                                {/* <MenuItem value={3}>requester</MenuItem> */}
                            </Select>
                        </FormControl>
                        <TextField label="search keyword" variant="standard" value={keyword} onChange={(e)=>{setKeyword(e.target.value)}} onKeyDown={(e)=>{if(e.key==='Enter')fnSearchKeyword()}}/>
                        <FormControl sx={{margin:'0px 10px',paddingTop:'10px'}}>
                            <Button variant="contained" onClick={fnSearchKeyword}>
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
                            {/* <TableCell align="right">
                                requester
                                <IconButton size="small">
                                    <HeightIcon fontSize="small" />
                                </IconButton>
                            </TableCell> */}
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
                            <TableCell align="right">Progress
                                {/* <IconButton size="small">
                                    <HeightIcon fontSize="small" />
                                </IconButton> */}
                            </TableCell>
                            <TableCell align="right">Importance
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
                        {taskList.map((row) => (
                            <TableRow
                                hover
                                key={row.task}
                                sx={{ cursor:'pointer' ,'&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={()=>onClick(row.taskId)}
                            >
                                {
                                    type === 'person' ?
                                    <TableCell>
                                        {row.prName ? row.prName : 'Unselected'}
                                    </TableCell>
                                    :
                                    ''
                                }
                                <TableCell component="th" scope="row">
                                    {row.taskTitle}
                                </TableCell>
                                <TableCell align="right">{row.assignName}</TableCell>
                                {/* <TableCell align="right">{row.requesterName}</TableCell> */}
                                <TableCell align="right">{row.startDt}</TableCell>
                                <TableCell align="right">{row.endDt}</TableCell>
                                <TableCell align="right">{row.progress}%</TableCell>
                                <TableCell align="right">
                                    {row.importance == 0 ? 'Minor' : 
                                    row.importance == 1 ? 'Unimportant' : 
                                    row.importance == 2 ? 'Important' : 
                                    row.importance == 3 ? 'Priority' : 
                                    row.importance == 4 ? 'Urgent' : ''}
                                </TableCell>
                                <TableCell align="right">
                                    {row.status === 'P' ? 'Proceeding' : row.status === 'E' ? 'End' : row.status === 'S' ? ' Stopped' : 'Deleted'}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[1, 3, 5]}
                        component="div"
                        count={taskListCnt}
                        rowsPerPage={searchCondition.perPage}
                        page={searchCondition.page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Grid>
        </Grid>
    )
}

function useTaskList(type : 'person' | 'project',search :Task){
    const navigate = useNavigate();
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [taskListCnt, setTaskListCnt] = useState<number>(0);
    const { refetch } = useQuery([type === 'project' ? "/task/project" : "/task/my",'/task'], type === 'project' ? ()=>getProjectTaskList(search) : ()=>getMyTaskList(search),{
        onSuccess : data =>{
            if(data.data.code === 'A1') navigate('/login');
            if(data){
                setTaskList(data.data.data.list);
                setTaskListCnt(data.data.data.count.cnt);
                
            }
        }
    });
    return {taskList,taskListCnt,refetch};
}