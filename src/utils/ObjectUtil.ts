type objType = {
    [key : string] : string;
}
export default {
    deepClone : function(obj : objType){
        const keys = Object.keys(obj);
        const newObj : any = {};
        keys.forEach(key=>{
            newObj[key] = obj[key];
        })
    }
}