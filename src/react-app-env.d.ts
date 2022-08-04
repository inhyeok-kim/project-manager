/// <reference types="react-scripts" />

interface Member{
    id : string
    name : string
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