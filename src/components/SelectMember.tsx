import { Avatar, Chip, Dialog, DialogTitle, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import { searchMemberList as search } from "../api/Member";

interface propType {
    value : Member[]
    onChange : Function
    multiple? : boolean
    deletable? : boolean
}

export default function SelectMember({
    value=[], onChange=()=>{}, multiple=true, deletable=true
}:propType){
    
    function unSelect(id:string){
        const newList = [...value];
        newList.splice(value.findIndex(mem=>mem.memId === id),1);
        onChange(newList);
    }

    const [searchMemberList, setSearchMemberList] = useState(members);
    const [searchName, setSearchName] = useState('');
    
    const [open, setOpen] = useState(false);
    useEffect( ()=>{
        getSearchMemberList(searchName);
    },[open,searchName]);

    async function getSearchMemberList(name:string){
        const list = await search({name:name} as Member);
        setSearchMemberList(list as Array<Member>);
    }

    function openDialog(){
        setOpen(true);
    }  
    function closeDialog(){
        setSearchName('');
        setOpen(false);
    }  

    function choiceMember(member:Member){
        if(multiple){
            if(value.find(mem=>mem.memId === member.memId)){
                const newList = [...value];
                newList.splice(value.findIndex(mem=>mem.memId === member.memId),1);
                onChange(newList);
            } else {
                onChange([...value,member]);
            }
        } else {
            onChange([member]);
            closeDialog();
        }
    }


    return (
        <>
            <Box 
                border={'1px solid rgba(0, 0, 0, 0.23)'} 
                sx={{
                    display: 'flex', padding : '15px', flexWrap: 'wrap', gap: 0.5,
                    cursor : 'pointer', borderRadius : '4px', minHeight : '32px',
                    '&:hover' : {border : '1px solid black'}
                }}

                onClick={openDialog}
            >
                {value.map((member) => {
                    if(member){
                        if(deletable){
                            return (
                                <Chip key={member.memId} label={member.name} onDelete={()=>{unSelect(member.memId!)}}/>
                                )
                        } else {
                                return (
                                <Chip key={member.memId} label={member.name}/>
                            )
                        }
                    }
                })}
            </Box>

            <Dialog fullWidth onClose={closeDialog} open={open} >
                <DialogTitle sx={{display:'flex',justifyContent:'space-between'}}>
                    Select Project Member
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={closeDialog}
                        aria-label="close"
                        >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Grid container justifyContent={'center'} marginBottom="20px">
                    <Grid item xs={11}>
                        <TextField fullWidth value={searchName}
                            label="Search Name" variant="standard"
                            onChange={(e)=>{setSearchName(e.target.value)}}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={()=>{setSearchName('')}}
                                        >
                                            <ClearIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                              }}
                            />
                    </Grid>
                </Grid>
                <List sx={{ pt: 0, height:'538px', overflowY:'auto'}} >
                    {value.map((member) => {
                        return (
                            <ListItem key={member.memId} button selected={true}
                                onClick={()=>{choiceMember(member)}}
                            >
                                <ListItemAvatar>
                                    <Avatar></Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={member.name} />
                                <ListItemText primary={'/'} />
                                <ListItemText primary={member.job} />
                                <ListItemText primary={'/'} />
                                <ListItemText primary={member.belong} />
                            </ListItem>
                        )
                    })}
                    {searchMemberList.map((member) => {
                        if(!value.find(mem=>member.memId === mem.memId)){
                            return (
                                <ListItem key={member.memId} button
                                onClick={()=>{choiceMember(member)}}
                                >
                                    <ListItemAvatar>
                                        <Avatar></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={member.name} />
                                    <ListItemText primary={'/'} />
                                    <ListItemText primary={member.job} />
                                    <ListItemText primary={'/'} />
                                    <ListItemText primary={member.belong} />
                                </ListItem>
                            )
                        }
                    })}
                </List>
            </Dialog>
        </>
    )
}

const members : Array<Member> = [
    {
        memId : 'member01',
        name : 'Oliver Hansen',
    },
    {
        memId : 'member02'  ,
        name : 'Van Henry',
    },
    {
        memId : 'member03' , 
        name : 'April Tucker',
    },
    {
        memId : 'member04'  ,
        name : 'Ralph Hubbard',
    },
    {
        memId : 'member05',  
        name : 'Omar Alexander',
    },
    {
        memId : 'member06'  ,
        name : 'Carlos Abbott',
    },
    {
        memId : 'member07'  ,
        name : 'Miriam Wagner',
    },
    {
        memId : 'member08'  ,
        name : 'Bradley Wilkerson',
    },
    {
        memId : 'member09'  ,
        name : 'Virginia Andrews',
    },
    {
        memId : 'member10'  ,
        name : 'Kelly Snyder',
    },
];