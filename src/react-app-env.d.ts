/// <reference types="react-scripts" />

interface SocketData {
    code : 'access' | 'chat' | 'error'
    body : any
}

interface Chat {
    [index, string]
    chId? : string
    chContent? : string
    chrId? : string
    registerId? : string
    registTime? : string
    isThread? : string
    upperCh? : string
    registerName? : string

    startDate? : Date
    endDate? : Date
    page? : number
    perPage? : number
}
interface ChatRoom {
    [index, string]
    chrId? : string
    prId? : string
    isDirect? : string

    membersId? : string[]
    membersName? : string[]
    memId? : string
    name? : string
    
    page? : number
    perPage? : number
}

interface Schedule {
    [index, string]
    startTm ? : string
    startDt ? : string
    schTitle ? : string
    schId ? : string
    schDescription ? : string
    registerId ? : string
    registTime ? : string
    prId ? : string
    endTm ? : string
    endDt ? : string

    prName? : string
    registerName? : string

    page? : number
    perPage? : number
}

interface Task {
    [index : string]
    taskId? : string
    taskTitle? : string
    taskDescription? : string
    status? : 'P' | 'S' | 'D' | 'E'
    startDt? : string
    requesterId? : string
    registTime? : Date
    progress? : number
    prId? : string
    importance? : number
    endDt? : string
    assignId? : string

    prName? : string
    requesterName? : string
    assignName? : string

    searchType? : 'or'
    page? : number
    perPage? : number
}

interface Project {
    [index : string]
    prId? : string
    prName? : string
    prDescription? : string
    isPrivate? : 'N' | 'Y'
    startDt? : string
    endDt? : string
    register? : string
    registTime? : Date
    status? : 'P' | 'E' | 'S' | 'D' | ''
    members? : Member[]
    page? : number
    perPage? : number
}

interface Member {
    [index : string] : string
    memId? : string
    name? : string
    isDelete? : string
    password? : string
    registTime? : Date
    job? : string
    belong? : string
    page? : number
    perPage? : number
}

interface EventTarget {
    value : any
}

interface GanttData {
    start : string
    end : string
    title : string
    assign : string
}

interface AsideMenu {
    to : string,
    text : string,
    icon? : ReactElement,
    children? : AsideMenu[]
}