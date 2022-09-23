/// <reference types="react-scripts" />

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