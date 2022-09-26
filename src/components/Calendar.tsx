import FullCalendar, { DateSelectArg, DatesSetArg, EventClickArg, EventDropArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { EventResizeDoneArg } from "@fullcalendar/interaction";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, FormControl, Switch} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { blueGrey } from "@mui/material/colors";
import { formatDateToString } from "../utils/FormatUtil";
import SelectProject from "./SelectProject";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getMyTaskList, getProjectTaskList } from "../api/Task";
import { deleteSchedule, getMyScheduleList, getProjectScheduleList, getSchedule, registSchedule, updateSchedule } from "../api/Schedule";
import { useNavigate } from "react-router-dom";

interface propType {
    type : 'person' | 'project',
    prId? : string
}
export default function Calendar({
    type,
    prId = '',
}:propType){
    const navigate = useNavigate();
    const calendarRef = useRef<FullCalendar>(null);
    const [selectDateRange, setSelectDateRange] = useState<Array<Date>|null>();
    const mouseLoc = useRef<Array<number>>();
    function fnSelectDate(arg : DateSelectArg){
        const mouseX = arg.jsEvent?.clientX;
        const mouseY = arg.jsEvent?.clientY;
        const endDate = new Date(arg.end)
        endDate.setDate(endDate.getDate()-1);
        const newDateRange = [arg.start, endDate];
        setSelectDateRange(newDateRange);
        mouseLoc.current = [mouseX!,mouseY!];
    }
    let searchTask = useRef({});
    useEffect(()=>{
        handleDateRange(new Date());
    },[]);

    function handleDateRange(e:Date){
        e.setMonth(e.getMonth()-1);
        const startDt = formatDateToString(e,'yyyy-mm-dd',true);
        e.setMonth(e.getMonth()+3);
        e.setDate(e.getDate()-1);
        const endDt = formatDateToString(e,'yyyy-mm-dd',true);
        searchTask.current = {
            prId:prId,
            startDt:startDt,
            endDt:endDt
        };
        taskQuery.refetch();
        scheduleQuery.refetch();
    }
    
    const taskQuery = useQuery([type === 'project' ? "/task/project" : "/task/my",'/task'], type === 'project' ? ()=>getProjectTaskList(searchTask.current) : ()=>getMyTaskList(searchTask.current),{
        onSuccess : data=>{
            const result = data.data;
            if(result.code === '0'){
                const _events = result.data.list.map((task : Task)=>{
                    return {
                        title : task.taskTitle,
                        start : task.startDt,
                        end : task.endDt === task.startDt ? task.endDt : new Date(task.endDt!).setDate(new Date(task.endDt!).getDate()+1),
                        allDay : true,
                        editable : false,
                        backgroundColor:'orange',
                        borderColor:'orange'
                    }
                });
                setTaskEvents(_events);
            }  
        },
        refetchInterval : false,
    });
    const scheduleQuery = useQuery([type === 'project' ? "/schedule/project" : "/schedule/my",'/schedule'], type === 'project' ? ()=>getProjectScheduleList(searchTask.current) : ()=>getMyScheduleList(searchTask.current),{
        onSuccess : data=>{
            const result = data.data;
            if(result.code === '0'){
                const _events = result.data.list.map((schedule : Schedule)=>{
                    return {
                        id : schedule.schId,
                        title : schedule.schTitle,
                        start : schedule.startDt + (schedule.startTm ? 'T'+schedule.startTm+':00':''),
                        end : schedule.startTm ? schedule.endDt + (schedule.endTm ? 'T'+schedule.endTm+':00':'') :(schedule.endDt === schedule.startDt ? schedule.endDt : formatDateToString(new Date(new Date(schedule.endDt!).setDate(new Date(schedule.endDt!).getDate()+1)),'yyyy-mm-dd',true)),
                        editable : true,
                        allDay : schedule.startTm ? false : true,
                    }
                });
                setScheduleEvents(_events);
            }  
        },
        refetchInterval : false
    });
    const [taskEvents, setTaskEvents] = useState([]);
    const [scheduleEvents, setScheduleEvents] = useState([]);


    const [selectedSchId, setSelectedSchId] = useState('');
    const [updateIsOpen, setRegistIsOpen] = useState(false);
    function updateOpen(){
        setRegistIsOpen(true);
    }
    function modalClose(){
        setRegistIsOpen(false);
    }
    function fnUpdateForm(e:EventClickArg){
        if(scheduleEvents.find((v:any)=>e.event.id === v.id)){
            setSelectedSchId(e.event.id);
            updateOpen();
        }
    }

    const saveMutation = useMutation(updateSchedule,{
        onSuccess : (data) => {
            if(data.data.code === 'A1') navigate('/login');
            if(data.data.code === '0'){
                scheduleQuery.refetch();
            }
        }
    });

    function fnDragDrop(e:EventDropArg){
        const id = e.event.id;
        const origin = scheduleQuery.data!.data.data.list.find((v:Schedule)=>{
            return v.schId === id;
        });
        if(origin){
            const newSch : Schedule = {...origin as Schedule};
            newSch.startDt = formatDateToString(e.event.start!,'yyyy-mm-dd',true);
            newSch.endDt = e.event.end ? formatDateToString(new Date(new Date(e.event.end!).setDate(e.event.end!.getDate()-1))!,'yyyy-mm-dd',true) : formatDateToString(e.event.start!,'yyyy-mm-dd',true);
            saveMutation.mutate(newSch);
        }  
    }
    function fnResize(e:EventResizeDoneArg){
        const id = e.event.id;
        const origin = scheduleQuery.data!.data.data.list.find((v:Schedule)=>{
            return v.schId === id;
        });
        if(origin){
            const newSch : Schedule = {...origin as Schedule};
            newSch.startDt = formatDateToString(e.event.start!,'yyyy-mm-dd',true);
            newSch.endDt = e.event.end ? formatDateToString(new Date(new Date(e.event.end!).setDate(e.event.end!.getDate()-1))!,'yyyy-mm-dd',true) : formatDateToString(e.event.start!,'yyyy-mm-dd',true);
            saveMutation.mutate(newSch);
        }  
    }

    return (
        <>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                // dateClick={(arg)=>{console.log(arg)}}
                initialView="dayGridMonth"
                headerToolbar ={{
                    right : 'today customprev,customnext'
                }}
                dayMaxEventRows={true}
                customButtons={{
                    customprev : {
                        icon : 'chevron-left',
                        click : function(){
                            if(calendarRef.current){
                                calendarRef.current.getApi().prev();
                                handleDateRange(calendarRef.current.getApi().getDate());
                            }
                        }
                    },
                    customnext : {
                        icon : 'chevron-right',
                        click : function(){
                            if(calendarRef.current){
                                calendarRef.current.getApi().next();
                                handleDateRange(calendarRef.current.getApi().getDate());
                            }
                        }
                    },
                }}
                unselectCancel = {'.unselectCancel, #menu-'}
                selectable={true}
                editable={true}
                eventClick={fnUpdateForm}
                select={(arg)=>{fnSelectDate(arg)}}
                unselect={()=>{setSelectDateRange(null)}}
                eventDrop={fnDragDrop}
                eventResize={fnResize}
                // eventContent={eventContent}
                events={scheduleEvents.concat(taskEvents)}
                // eventMouseEnter={mouseEnter}
            />
            {
                selectDateRange ? 
                    <CalTooltip mouseLoc={mouseLoc.current!} dateRange={selectDateRange} />
                :
                    ''
            }
            {
                updateIsOpen ? 
                    <ModalRegistForm schId={selectedSchId} mode={'update'} isOpen={updateIsOpen} onClose={modalClose} />
                :
                    ''
            }
        </>
    )
}

function eventContent(eventInfo : any){
    console.log(eventInfo);
    return (
        <>
            <b>{eventInfo.timeText}m</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

function mouseEnter(mouseEnterInfo : any){
    console.log(mouseEnterInfo.el)
}

interface CalTooltipProp {
    mouseLoc : Array<number>,
    dateRange : Array<Date> |null
}
function CalTooltip({
    mouseLoc,
    dateRange
}:CalTooltipProp){
    
    const [registIsOpen, setRegistIsOpen] = useState(false);
    function registOpen(){
        setRegistIsOpen(true);
    }
    function modalClose(){
        setRegistIsOpen(false);
    }
    function fnRegistForm(e:React.MouseEvent){
        registOpen();
    }


    return (
        <>
            <Grid className="unselectCancel" sx={{position:'fixed', top : mouseLoc[1], left: mouseLoc[0], zIndex:'1',background:'white',borderRadius:'4px'}}>
                <Button onClick={fnRegistForm} variant="outlined" >New</Button>
            </Grid>
            {
                registIsOpen ? 
                    <ModalRegistForm mode={'regist'} dateRange={dateRange} isOpen={registIsOpen} onClose={modalClose} />
                :
                    ''
            }
        </>
    )
}

interface ModalRegistFormPropType {
    isOpen : boolean
    onClose : Function
    dateRange? : Array<Date> | null
    mode : 'regist'|'update'
    schId? : string
}
function ModalRegistForm({
    isOpen,
    onClose,
    dateRange,
    mode = 'regist',
    schId = ''
}:ModalRegistFormPropType){
    const navigate = useNavigate();
    function modalClose(){
        onClose();
    }
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [project, setProject] = useState('');

    const [startDate, setStartDate] = useState(dateRange?formatDateToString(dateRange![0],"yyyy-mm-dd",true):'');
    const [endDate, setEndDate] = useState(dateRange?formatDateToString(dateRange![1],"yyyy-mm-dd",true):'');

    const [allDay, setAllDay] = useState(false);
    const [startTime, setStartTime] = useState(dateRange?formatDateToString(new Date(),"HH:MM",true):'');
    const [endTime, setEndTime] = useState(dateRange?formatDateToString(new Date(),"HH:MM",true):'');
    
    function fnSetDate(type:'start'|'end', value : string){
        switch (type) {
            case 'start':
                if(new Date(value +' '+ startTime) > new Date(endDate+ ' '+endTime)){
                    setStartDate(value);
                    setEndDate(value);
                    setEndTime(startTime);
                } else {
                    setStartDate(value);
                }
                break;
            case 'end':
                if(new Date(startDate +' '+ startTime) > new Date(value+ ' '+endTime)){
                    setStartDate(value);
                    setEndDate(value);
                    setStartTime(endTime);
                } else {
                    setEndDate(value);
                }
                break;
        }
    }
    function fnSetTime(type:'start'|'end', value : string){
        switch (type) {
            case 'start':
                if(new Date(startDate +' '+ value) > new Date(endDate+ ' '+endTime)){
                    setStartTime(value);
                    setEndTime(value);
                    setEndDate(startDate);
                } else {
                    setStartTime(value);
                }
                break;
            case 'end':
                if(new Date(startDate +' '+ startTime) > new Date(endDate+ ' '+value)){
                    setStartDate(startDate);
                    setEndTime(value);
                    setStartTime(value);
                } else {
                    setEndTime(value);
                }
                break;
        }
    }

    useQuery([`/schedule/`+schId],()=>getSchedule({schId:schId}),{
        onSuccess : (data)=>{
            if(data.data.code === "0"){
                if(data.data.data.schId){
                    const schedule : Schedule = data.data.data;
                    setTitle(schedule.schTitle!);
                    setProject(schedule.prId!);
                    setDesc(schedule.schDescription!);
                    setStartDate(schedule.startDt!);
                    setEndDate(schedule.endDt!);
                    setStartTime(schedule.startTm!);
                    setEndTime(schedule.endTm!);
                    setAllDay(schedule.startTm ? false : true);
                }
            }
        }
    });

    const queryClient = new QueryClient();
    const deleteMutation = useMutation(deleteSchedule,{
        onSuccess : (data) => {
            if(data.data.code === 'A1') navigate('/login');
            if(data.data.code === '0'){
                alert( 'Schedule delete successful');
                queryClient.invalidateQueries(['/schedule']);
                modalClose();
            }
        }
    });

    const saveMutation = useMutation(mode === 'regist' ? registSchedule : updateSchedule,{
        onSuccess : (data) => {
            if(data.data.code === 'A1') navigate('/login');
            if(data.data.code === '0'){
                alert( mode === 'regist' ? 'New Schedule registration ' : 'The Schedule update ' + 'successful');
                queryClient.invalidateQueries(['/schedule']);
                modalClose();
            }
        }
    });
    function fnDelete(){
        deleteMutation.mutate(schId);
    }

    function fnRegist(){
        const newSch : Schedule = {
            schId : schId,
            prId : project,
            schTitle : title,
            schDescription : desc,
            startDt : startDate,
            startTm : allDay ? '' : startTime,
            endDt : endDate,
            endTm : allDay ? '' : endTime,
        }
        saveMutation.mutate(newSch);
    }

    return (

            <Dialog className="unselectCancel" open={isOpen} onClose={modalClose} fullWidth>
                <DialogTitle>{ mode === 'regist' ? 'New Schedule' : 'Schedule'}</DialogTitle>
                <DialogContent >
                    <Grid item xs={12} sx={{marginTop : '2%'}}>
                        <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Schedule Title</Typography>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{marginTop : '2%'}}>
                        <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Project</Typography>
                        <FormControl >
                            <SelectProject 
                                value={project}
                                onChange={setProject}

                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{marginTop : '2%'}}>
                        <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Schedule Description</Typography>
                        <TextField multiline minRows={3} margin="dense" fullWidth variant="outlined" value={desc} onChange={(e)=>setDesc(e.target.value)}/>
                    </Grid>
                    <Grid container columnSpacing={3} sx={{marginTop : '2%'}}>
                        <Grid item xs={6}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Start Date</Typography>
                            <TextField fullWidth type={"date"} onChange={(e)=>fnSetDate('start',e.target.value)} value={startDate} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">End Date</Typography>
                            <TextField fullWidth type={"date"} onChange={(e)=>fnSetDate('end',e.target.value)} value={endDate}/>
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={3} sx={{marginTop : '2%'}}>
                        <Grid item xs={6}>
                            <Typography color={blueGrey[800]} marginTop={'1%'} paddingLeft={'1%'} variant="subtitle2">All Day</Typography>
                            <Switch checked={allDay} onChange={(e)=>setAllDay(e.target.checked)} />
                        </Grid>
                    </Grid>
                    {
                        allDay ?
                        ''
                        :
                        <Grid container columnSpacing={3} sx={{marginTop : '2%'}}>
                            <Grid item xs={6}>
                                <Typography color={blueGrey[800]} marginTop={'1%'} paddingLeft={'1%'} variant="subtitle2">Start Time</Typography>
                                <TextField fullWidth type={"time"} onChange={(e)=>fnSetTime('start',e.target.value)} value={startTime} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color={blueGrey[800]} marginTop={'1%'} paddingLeft={'1%'} variant="subtitle2">End Time</Typography>
                                <TextField fullWidth type={"time"} onChange={(e)=>fnSetTime('end',e.target.value)} value={endTime} />
                            </Grid>
                        </Grid>
                    }

                </DialogContent>
                <DialogActions>
                    {mode === 'update' ? 
                        <Button onClick={fnDelete} color={"error"}>Delete</Button> 
                        : 
                        <Button onClick={modalClose}>Cancel</Button>
                    }
                    <Button onClick={fnRegist}>Save</Button>
                </DialogActions>
            </Dialog>
    )
}