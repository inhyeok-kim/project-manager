import { FormControl, Grid, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { formatDateToString } from "../utils/FormatUtil";
import Gantt from "./Gantt";

export default function TaskGantt(){

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

    const taskList = useMemo(()=>{
        return searchData(searchStart,searchEnd);
    },[searchEnd,searchStart]);

    const timeLine = useMemo(()=>{
        return createTimeLine(searchStart,searchEnd);
    },[searchEnd,searchStart]);

    return (
        <Grid item xs={12}>
            <Grid item xs={12}>
                <FormControl sx={{margin:'0px 10px'}}>
                    <TextField label=" " value={searchStart} onChange={searchStartHandler} variant="standard" type={"date"} />
                </FormControl>
                <FormControl sx={{margin:'0px 10px'}}>
                    <TextField label=" " value={searchEnd} onChange={searchEndHandler} variant="standard" type={"date"} />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Gantt timeLine={timeLine} datas={taskList} />
            </Grid>
        </Grid>
    )
}

function createTimeLine(start : string, end : string){
    const timeLine = [];
    const date = new Date(start);
    for(var i = 0; i < calcBetweenDate(start, end); i++){
        timeLine.push(dateToString(date));
        date.setDate(date.getDate()+1);
    }
    return timeLine;
}

function calcBetweenDate(start:string, end:string){
    const date1 = new Date(end);
    const date2 = new Date(start);
    const gapm = date1.getTime() - date2.getTime();
    return gapm/(1000*60*60*24);

}

function dateToString(date : Date){
    return `${date.getFullYear()}-${date.getMonth() >= 9 ? date.getMonth()+1 : '0'+(date.getMonth()+1)}-${date.getDate() >= 10 ? date.getDate() : '0'+(date.getDate())}`;
}

function searchData(start : string,end:string){
    return datas.filter((data)=>{
        let isOk = true;
        if(start){
            if(data.end.replaceAll('-','') < start.replaceAll('-','')) isOk = false;
        }
        if(end){
            if(data.start.replaceAll('-','') > end.replaceAll('-','')) isOk = false;
        }
        return isOk;
    });
}

const datas : GanttData[] = [
    {
        start : '2022-08-02',
        end : '2022-08-03',
        title : 'this is a title',
        assign : 'Who Someone'
    },
    {
        start : '2022-08-02',
        end : '2022-08-05',
        title : 'this is a title',
        assign : 'Who Someone'
    },
    {
        start : '2022-08-03',
        end : '2022-08-06',
        title : 'this is a title',
        assign : 'Who Someone'
    },
    {
        start : '2022-08-07',
        end : '2022-08-10',
        title : 'this is a title',
        assign : 'Who Someone'
    },
    {
        start : '2022-08-05',
        end : '2022-08-15',
        title : 'this is a title',
        assign : 'Who Someone'
    },
    {
        start : '2022-08-12',
        end : '2022-08-18',
        title : 'this is a title',
        assign : 'Who Someone'
    },
    {
        start : '2022-08-16',
        end : '2022-08-21',
        title : 'this is a title',
        assign : 'Who Someone'
    },
]