import FullCalendar, { EventContentArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar(){

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            dateClick={(arg)=>{console.log(arg)}}
            initialView="dayGridMonth"
            headerToolbar ={{
                center: 'dayGridMonth,dayGridWeek',
            }}
            selectable={true}
            editable={true}
            select={(arg)=>{console.log(arg)}}
            // eventContent={eventContent}
            events={[
                {title : 'event 1', date : '2022-07-01T15:30:00'}
            ]}
            eventMouseEnter={mouseEnter}
        />
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