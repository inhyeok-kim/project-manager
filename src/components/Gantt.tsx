import React, { useEffect, useMemo, useRef, useState } from "react"

interface GanttData {
    start : string
    end : string
    title : string
    assign : string
}

interface propType{
    datas : GanttData[]
    timeLine : string[]
}
export default function Gantt({
    datas,
    timeLine
} : propType){
    const [svgWidth, setSvgWidth] = useState(1000);
    const svgHeight = useMemo(()=>{
        return (datas.length * 25) + 75;
    },[datas]);

    const cursorLine = useRef<SVGLineElement>(null);
    function mouseMove(e:React.MouseEvent){
        if(cursorLine.current){
            cursorLine.current.setAttributeNS(null,'x1',e.nativeEvent.offsetX.toString());
            cursorLine.current.setAttributeNS(null,'x2',e.nativeEvent.offsetX.toString());
        }
    }
    function mouseLeave(e:React.MouseEvent){
        if(cursorLine.current){
            cursorLine.current.setAttributeNS(null,'stroke','');
        }
    }
    function mouseEnter(e:React.MouseEvent){
        if(cursorLine.current){
            cursorLine.current.setAttributeNS(null,'stroke','grey');
        }
    }

    useEffect(()=>{
        setSvgWidth(timeLine.length*100);
    },[timeLine]);
    

    function renderTimeLine(isTop:boolean){
        return timeLine.map((time,i)=>{
            const x = (i * 100) + 17.25;
            const y = isTop ? 10 : svgHeight-10;
            const d= isTop ?
                 `M ${i * 100} 20 L ${i*100} 30 M ${(i+1)*100} 20 L ${(i+1)*100} 30` :
                 `M ${i * 100} ${svgHeight - 30} L ${i*100} ${svgHeight-40} M ${(i+1)*100} ${svgHeight-30} L ${(i+1)*100} ${svgHeight-40}`;
    
            return (
                <>
                    <text key={i+'text'} fontSize={'0.8rem'} x={x} y={y}>{time}</text>
                    <path key={i+'path'} d={d} stroke="black"></path>
                </>
            )
        });
    }

    function renderGantt(){
        return datas.map((data,i)=>{
            const startCnt = Math.max(timeLine.indexOf(data.start),0);
            const dateCnt = (timeLine.indexOf(data.end)> -1 ? timeLine.indexOf(data.end) : timeLine.length-1) - Math.max(timeLine.indexOf(data.start),0);
            const x = 100 * startCnt;
            const y = 35 + (i*25);
            const width = 100*(1+dateCnt);
            const height = 20;
            const color = "#"+ Math.floor(Math.random() * 16777215).toString(16);
            return <rect key={i} x={x} y={y} width={width} height={height} fill={color} style={{cursor:'pointer'}}></rect>
        });
    }

    return (
        <div style={{display:'flex',justifyContent:'center'}}>
            <div style={{width:'1500px',overflow:'auto',marginTop:'30px'}}>
                <svg width={svgWidth} height={svgHeight} onMouseMove={mouseMove} onMouseLeave={mouseLeave} onMouseEnter={mouseEnter}>
                    <line ref={cursorLine} x1="0" y1="20" x2="0" y2={svgHeight-30} stroke="grey"></line>
                    {renderTimeLine(true)}
                    <line x1="0" y1="20" x2={svgWidth} y2='20' stroke="black"></line>
                    {renderGantt()}
                    <line x1={0} y1={svgHeight - 30} x2={svgWidth} y2={svgHeight - 30} stroke="black"></line>
                    {renderTimeLine(false)}
                </svg>
            </div>
        </div>
    )
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

