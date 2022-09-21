import { Avatar, Grid, Typography } from "@mui/material";

export default function ChatContent(){

    return (
        <Grid padding={'10px'}>
            <Grid container>
                <Grid sx={{width:'56px'}}>
                    <Avatar></Avatar>
                </Grid>
                <Grid sx={{width:'calc(100% - 56px)'}}>
                    <Grid>
                        <Typography fontSize={'1rem'}>username</Typography>
                        <Typography fontSize={'0.8rem'}>2022-07-14</Typography>
                    </Grid>
                    <Grid>
                        text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text   
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}