export function formatCurrency(str : string | number | undefined){
    let param = str;
    if(typeof str === 'string'){
        try {
            param = Number(str.replaceAll(',',''));
        } catch (error) {
            console.error('cannot formatable string');
            return '0';
        }
    }
    param = String(param)
    let res = '';
    let cnt = 0;
    for(let i=param.length-1; i >= 0; i--){
        cnt++;
        if(cnt > 3){
            res = ',' + res;
            cnt = 1;
        }
        res = param[i] + res;
    }
    return res;
}

const dateFormatType : 'yyyymmdd' | 'yyyy-mm-dd' | 'yy-mm-dd' | 'yyyymm' | 'yymm' | 'yyyy-mm' | 'yyyymm' | 'mmdd' | 'mm-dd'
                    | 'yyyy/mm/dd' | 'yy/mm/dd' | 'yyyy/mm' | 'yy/mm' | 'mm/dd' | 'mm/dd'
                    | 'yyyy mm dd' | 'yy mm dd' | 'yyyy mm' | 'yy mm' | 'mm dd' | 'mm dd'
                    | 'yy년 mm월 dd일' | 'yy년 mm월' | 'yyyy년 mm월 dd일' | 'yyyy년 mm월' | 'mm월 dd일'
                    | 'HH:MM:SS' | 'HH:MM' | 'MM:SS' | 'HH시 MM분 SS초'
                    = 'yyyy-mm-dd';

export function formatDateToString(date : Date, format : typeof dateFormatType, fullMark? : boolean){
    let res : string = format;
    const year = ''+date.getFullYear();
    const month = ''+(date.getMonth()+1);
    const day = ''+date.getDate();
    const hour = ''+date.getHours();
    const minutes = ''+date.getMinutes();
    const seconds = ''+date.getSeconds();

    // 연
    let cnt = year.length-1;
    while(res.lastIndexOf('y') > -1){
        const s1 = res.substring(0,res.lastIndexOf('y'));
        const s2 = res.substring(res.lastIndexOf('y')+1);
        res = s1 + (cnt > -1 ? year.substr(cnt,1) : fullMark ? '0' : '') + s2;
        cnt--;
    }
     
    // 월
    cnt = month.length-1;
    while(res.lastIndexOf('m') > -1){
        const s1 = res.substring(0,res.lastIndexOf('m'));
        const s2 = res.substring(res.lastIndexOf('m')+1);
        res = s1 + (cnt > -1 ? month.substr(cnt,1) : fullMark ? '0' : '') + s2;
        cnt--;
    }

    //일
    cnt = day.length-1;
    while(res.lastIndexOf('d') > -1){
        const s1 = res.substring(0,res.lastIndexOf('d'));
        const s2 = res.substring(res.lastIndexOf('d')+1);
        res = s1 + (cnt > -1 ? day.substr(cnt,1) : fullMark ? '0' : '') + s2;
        cnt--;
    }

    //시
    cnt = hour.length-1;
    while(res.lastIndexOf('H') > -1){
        const s1 = res.substring(0,res.lastIndexOf('H'));
        const s2 = res.substring(res.lastIndexOf('H')+1);
        res = s1 + (cnt > -1 ? hour.substr(cnt,1) : fullMark ? '0' : '') + s2;
        cnt--;
    }
    
    //분
    cnt = minutes.length-1;
    while(res.lastIndexOf('M') > -1){
        const s1 = res.substring(0,res.lastIndexOf('M'));
        const s2 = res.substring(res.lastIndexOf('M')+1);
        res = s1 + (cnt > -1 ? minutes.substr(cnt,1) : fullMark ? '0' : '') + s2;
        cnt--;
    }

    //초
    cnt = seconds.length-1;
    while(res.lastIndexOf('S') > -1){
        const s1 = res.substring(0,res.lastIndexOf('S'));
        const s2 = res.substring(res.lastIndexOf('S')+1);
        res = s1 + (cnt > -1 ? seconds.substr(cnt,1) : fullMark ? '0' : '') + s2;
        cnt--;
    }
    

    
    return res;
}
