import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { ChangeEvent, useState,useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import SelectProject from "./SelectProject";
import { formatDateToString } from "../utils/FormatUtil";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { deleteTask, getTask, registTask, updateTask } from "../api/Task";
import { useNavigate } from "react-router-dom";

interface propType {
    isOpen : boolean
    onClose : Function
    prId? : string
    mode : 'regist' | 'update'
    taskId? : string
}
export default function ModalTaskForm({
    isOpen, onClose, prId = '', mode, taskId=''
}:propType){
    const navigate = useNavigate();
    
    function modalClose(){
        onClose();
    }
    
    const [title,setTitle] = useState('');
    const [project, setProject] = useState(prId);
    // const [assignment, setAssignment] = useState<Member[]>([]);
    const [desc, setDesc] = useState('');
    const [startDt, setStartDt] = useState(formatDateToString(new Date(),"yyyy-mm-dd",true));
    const [endDt, setEndDt] = useState(formatDateToString(new Date(),"yyyy-mm-dd",true));
    const [importance, setImportance] = useState(0);
    const [progress, setProgress] = useState(0);
    function progressHandler(e:ChangeEvent<HTMLInputElement>){
        let value = e.target.value;
        if(!value){
            setProgress(0);
            return;
        }
        const reg = /^[0-9]+$/;
        if(reg.test(value)){
            value = parseInt(value)
            if(value >= 0 && value <= 100){
                setProgress(value);
            }
        }
    }
    const [status, setStatus] = useState('P');
    
    useQuery([`/task/`+taskId],()=>getTask({taskId:taskId}),{
        onSuccess : (data)=>{
            if(data.data.code === "0"){
                if(data.data.data.taskId){
                    const task : Task = data.data.data;
                    setTitle(task.taskTitle!);
                    setProject(task.prId!);
                    setDesc(task.taskDescription!);
                    setStartDt(task.startDt!);
                    setEndDt(task.endDt!);
                    setImportance(task.importance!);
                    setProgress(task.progress!);
                    setStatus(task.status!);
                }
            }
        }
    });
    
    const queryClient = new QueryClient();
    const saveMutation = useMutation(mode === 'regist' ? registTask : updateTask,{
        onSuccess : (data) => {
            if(data.data.code === 'A1') navigate('/login');
            if(data.data.code === '0'){
                alert( mode === 'regist' ? 'New Task registration ' : 'The Task update ' + 'successful');
                queryClient.invalidateQueries(['/task']);
                modalClose();
            }
        }
    });
    
    function fnSave(){
        if(validation()){
            const newTask : Task = {
                taskTitle : title,
                taskDescription : desc,
                prId : project,
                startDt : startDt,
                endDt : endDt,
                progress : progress,
                importance : importance,
                status : status as "P" | "S" | "D" | "E" 
            }
            if(mode === 'update' && taskId){
                newTask.taskId = taskId;
            }
            saveMutation.mutate(newTask);
        }
    }
    
    const deleteMutation = useMutation(deleteTask,{
        onSuccess : (data) => {
            if(data.data.code === '0'){
                if(data.data.code === 'A1') navigate('/login');
                alert('Task delete successful');
                queryClient.invalidateQueries(['/task']);
                modalClose();
            }
        }
    });
    function fnDelete(){
        if(taskId && mode ==='update'){
            deleteMutation.mutate(taskId);
        }
    }

    function validation(){
        if(!title.trim()) {
            alert('Need type title');
            return false;
        }
        return true;
    }

    return (

            <Dialog open={isOpen} onClose={modalClose} fullWidth>
                <DialogTitle sx={{display:'flex',justifyContent:'space-between'}}>
                    { mode === 'regist' ? 'New Task' : 'Task'}
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={modalClose}
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
                            value={title}
                            onChange={(e)=>{setTitle(e.target.value)}}
                        />
                    </Grid>
                    <Grid container columnSpacing={3} sx={{marginTop : '2%'}}>
                        <Grid item xs={6}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Project</Typography>
                            <SelectProject value={project}
                                fullWidth={true}
                                onChange={setProject} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Status</Typography>
                            <Select 
                                fullWidth
                                value={status}
                                onChange={(e)=>{setStatus(e.target.value)}}
                            >
                                <MenuItem value='P'>Proceeding</MenuItem>
                                <MenuItem value='S'>Stopped</MenuItem>
                                <MenuItem value='E'>End</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>

                    {/* <Grid item xs={12} sx={{marginTop : '2%'}}>
                        <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Assignment</Typography>
                        <Grid container>
                            <Grid  item xs={10}>
                                <SelectMember deletable={false} value={assignment} onChange={setAssignment} multiple={false}  />
                            </Grid>
                            <Button variant="contained">Self</Button>
                        </Grid>
                    </Grid> */}
                    <Grid item xs={12} sx={{marginTop : '2%'}}>
                        <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Task Description</Typography>
                        <TextField multiline minRows={3} margin="dense" fullWidth variant="outlined" value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
                    </Grid>
                    <Grid container columnSpacing={3} sx={{marginTop : '2%'}}>
                        <Grid item xs={6}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Start Date</Typography>
                            <TextField fullWidth type={"date"} value={startDt} onChange={(e)=>{setStartDt(e.target.value)}}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">End Date</Typography>
                            <TextField fullWidth type={"date"} value={endDt} onChange={(e)=>{setEndDt(e.target.value)}}/>
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={3} sx={{marginTop : '2%'}}>
                        <Grid item xs={6}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Progress</Typography>
                            <TextField
                                fullWidth
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}

                                value={progress}
                                onChange={progressHandler}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Importance</Typography>
                            <Select 
                                fullWidth
                                value={importance}
                                onChange={(e)=>{setImportance(e.target.value)}}
                            >
                                <MenuItem value='0'>Minor</MenuItem>
                                <MenuItem value='1'>Unimportant</MenuItem>
                                <MenuItem value='2'>Important</MenuItem>
                                <MenuItem value='3'>Priority</MenuItem>
                                <MenuItem value='4'>Urgent</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    {mode === 'update' ? 
                        <Button onClick={fnDelete} color={"error"}>Delete</Button> 
                        : 
                        <Button onClick={modalClose}>Cancel</Button>
                    }
                    <Button onClick={fnSave}>Save</Button>
                </DialogActions>
            </Dialog>
    )
}