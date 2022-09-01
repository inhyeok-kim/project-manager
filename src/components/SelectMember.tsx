import { Avatar, Chip, Dialog, DialogTitle, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';

interface propType {
    value : any
    onChange : Function
    multiple? : boolean
    deletable? : boolean
}

export default function SelectMember({
    value=[], onChange=()=>{}, multiple=true, deletable=true
}:propType){

    const [memberList, setMemeberList] = useState<string[]>(value);

    function unSelect(id:string){
        const newList = [...memberList];
        newList.splice(memberList.indexOf(id),1);
        setMemeberList(newList);
    }

    useEffect(()=>{
        onChange(memberList);
    },[memberList]);

    const [open, setOpen] = useState(false);
    function openDialog(){
        setOpen(true);
    }  
    function closeDialog(){
        setSearchName('');
        setOpen(false);
    }  

    function choiceMember(id:string){
        if(multiple){
            if(memberList.includes(id)){
                const newList = [...memberList];
                newList.splice(memberList.indexOf(id),1);
                setMemeberList(newList);
            } else {
                setMemeberList([...memberList,id]);
            }
        } else {
            setMemeberList([id]);
            closeDialog();
        }
    }

    const [searchMemberList, setSearchMemberList] = useState(members);
    const [searchName, setSearchName] = useState('');
    useEffect(()=>{
        setSearchMemberList(members.filter(member=>member.name.toUpperCase().indexOf(searchName.toUpperCase())>=0));
    },[searchName]);

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
                {memberList.map((id) => {
                    const member = members.find(member=>id===member.id);
                    if(member){
                        if(deletable){
                            return (
                                <Chip key={member.id} label={member.name} onDelete={()=>{unSelect(member.id)}}/>
                                )
                        } else {
                                return (
                                <Chip key={member.id} label={member.name}/>
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
                    {searchMemberList.map((member) => {
                        if(memberList.includes(member.id)){
                            return (
                                <ListItem key={member.id} button selected={true}
                                    onClick={()=>{choiceMember(member.id)}}
                                >
                                    <ListItemAvatar>
                                        <Avatar></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={member.name} />
                                </ListItem>
                            )
                        }
                    })}
                    {searchMemberList.map((member) => {
                        if(!memberList.includes(member.id)){
                            return (
                                <ListItem key={member.id} button
                                    onClick={()=>{choiceMember(member.id)}}
                                >
                                    <ListItemAvatar>
                                        <Avatar></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={member.name} />
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
        id : 'member01',
        name : 'Oliver Hansen',
    },
    {
        id : 'member02'  ,
        name : 'Van Henry',
    },
    {
        id : 'member03' , 
        name : 'April Tucker',
    },
    {
        id : 'member04'  ,
        name : 'Ralph Hubbard',
    },
    {
        id : 'member05',  
        name : 'Omar Alexander',
    },
    {
        id : 'member06'  ,
        name : 'Carlos Abbott',
    },
    {
        id : 'member07'  ,
        name : 'Miriam Wagner',
    },
    {
        id : 'member08'  ,
        name : 'Bradley Wilkerson',
    },
    {
        id : 'member09'  ,
        name : 'Virginia Andrews',
    },
    {
        id : 'member10'  ,
        name : 'Kelly Snyder',
    },
];