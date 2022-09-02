import FullCalendar, { DateSelectArg, EventContentArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, Select, MenuItem, InputLabel,FormControl} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { blueGrey } from "@mui/material/colors";
import { formatDateToString } from "../utils/FormatUtil";

export default function Calendar(){
    const [selectDateRange, setSelectDateRange] = useState<Array<Date>|null>();
    const [mouseLoc, setMouseLoc] = useState<Array<number>>();
    function fnSelectDate(arg : DateSelectArg){
        const mouseX = arg.jsEvent?.clientX;
        const mouseY = arg.jsEvent?.clientY;
        const endDate = new Date(arg.end)
        endDate.setDate(endDate.getDate()-1);
        const newDateRange = [arg.start, endDate];
        setSelectDateRange(newDateRange);
        setMouseLoc([mouseX!,mouseY!]);
    }

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                // dateClick={(arg)=>{console.log(arg)}}
                initialView="dayGridMonth"
                headerToolbar ={{
                    center: 'dayGridMonth,dayGridWeek',
                }}
                unselectCancel = {'.unselectCancel, #menu-'}
                selectable={true}
                editable={true}
                select={(arg)=>{fnSelectDate(arg)}}
                unselect={()=>{setSelectDateRange(null)}}
                // eventContent={eventContent}
                events={[
                    {title : 'task 1', start : '2022-08-01T15:30:00',end : '2022-08-01T18:30:00', editable : true,backgroundColor:'orange',borderColor:'orange'},
                    {title : 'event 1', start : '2022-08-01T15:30:00',end : '2022-08-01T18:30:00', editable : true},
                    {title : 'task 2', start : '2022-08-09T15:30:00',end : '2022-08-11T18:30:00', editable : true,backgroundColor:'orange',borderColor:'orange'},
                    {title : 'event 2', start : '2022-08-07T15:30:00',end : '2022-08-10T18:30:00', editable : true},
                ]}
                eventMouseEnter={mouseEnter}
            />
            {
                selectDateRange ? 
                    <CalTooltip mouseLoc={mouseLoc!} dateRange={selectDateRange} />
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
    function registClose(){
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
                    <ModalRegistForm dateRange={dateRange} isOpen={registIsOpen} onClose={registClose} />
                :
                    ''
            }
        </>
    )
}

interface ModalRegistFormPropType {
    isOpen : boolean
    onClose : Function
    dateRange : Array<Date> | null
}
function ModalRegistForm({
    isOpen,
    onClose,
    dateRange
}:ModalRegistFormPropType){

    function registClose(){
        onClose();
    }
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const [startDate, setStartDate] = useState(formatDateToString(dateRange![0],"yyyy-mm-dd",true));
    const [endDate, setEndDate] = useState(formatDateToString(dateRange![1],"yyyy-mm-dd",true));

    
    const [startTime, setStartTime] = useState(formatDateToString(dateRange![0],"HH:MM",true));
    const [endTime, setEndTime] = useState(formatDateToString(dateRange![1],"HH:MM",true));
    
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

    function fnRegist(){
        const _startDate = new Date(startDate +' '+ startTime);
        const _endDate = new Date(endDate +' '+ endTime);
        console.log({
            start : _startDate,
            end : _endDate,
            title : title,
            desc : desc
        });
    }

    return (

            <Dialog className="unselectCancel" open={isOpen} onClose={registClose} fullWidth>
                <DialogTitle>New Schedule</DialogTitle>
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
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className="unselectCancel"
                                value={'1'}
                                sx={{minWidth:'120px'}}
                                // onChange={handleChange}
                                >
                                <MenuItem value='1'>Select Project</MenuItem>
                                <MenuItem className="unselectCancel" value={10}>Ten</MenuItem>
                                <MenuItem className="unselectCancel" value={20}>Twenty</MenuItem>
                                <MenuItem className="unselectCancel" value={30}>Thirty</MenuItem>
                            </Select>
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
                            <Typography color={blueGrey[800]} marginTop={'1%'} paddingLeft={'1%'} variant="subtitle2">Start Time</Typography>
                            <TextField fullWidth type={"time"} onChange={(e)=>fnSetTime('start',e.target.value)} value={startTime} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">End Date</Typography>
                            <TextField fullWidth type={"date"} onChange={(e)=>fnSetDate('end',e.target.value)} value={endDate}/>
                            <Typography color={blueGrey[800]} marginTop={'1%'} paddingLeft={'1%'} variant="subtitle2">End Time</Typography>
                            <TextField fullWidth type={"time"} onChange={(e)=>fnSetTime('end',e.target.value)} value={endTime} />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={registClose}>Cancel</Button>
                    <Button onClick={fnRegist}>Save</Button>
                </DialogActions>
            </Dialog>
    )
}