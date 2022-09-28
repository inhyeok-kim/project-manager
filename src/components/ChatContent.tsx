import { Avatar, Grid, Typography, Divider } from "@mui/material";

interface propType {
    chat : Chat,
    onClick? : Function
}
export default function ChatContent({
    chat, onClick=()=>{}
}: propType){

    return (
        <Grid padding={'10px'} onClick={()=>onClick(chat.chId)}>
            <Grid container>
                <Grid sx={{width:'56px'}}>
                    <Avatar></Avatar>
                </Grid>
                <Grid sx={{width:'calc(100% - 56px)'}}>
                    <Grid>
                        <Typography fontSize={'1rem'}>{chat.registerName}</Typography>
                        <Typography fontSize={'0.8rem'}>{new Date(chat.registTime!).toLocaleString()}</Typography>
                    </Grid>
                    <Grid sx={{whiteSpace:'pre-line'}}>
                        {chat.chContent}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}