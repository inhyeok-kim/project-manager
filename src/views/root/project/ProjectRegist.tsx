import { Button, Card, CardContent, CardHeader, Grid, Stack, Switch, TextField, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import {  useState } from "react";
import SelectMember from "../../../components/SelectMember";
import { registProject } from "../../../api/Project";
import { formatDateToString } from "../../../utils/FormatUtil";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


export default function Regist(){
    const navigate = useNavigate();
    
    const [projectName, setProjectName] = useState('');
    const [projectDescript, setProjectDescript] = useState('');
    const [projectPrivate, setProjectPrivate] = useState(false);
    
    const [members, setMembers] = useState<Member[]>([]);
    
    const [startDate,setStartDate] = useState(formatDateToString(new Date(),'yyyy-mm-dd',true));
    const [endDate,setEndDate] = useState(formatDateToString(new Date(),'yyyy-mm-dd',true));

    const queryClient = new QueryClient();
    const registMutation = useMutation(registProject,{
        onSuccess : (data) => {
            if(data.data.code === 'A1') navigate('/login');
            if(data.data.code === '0'){
                alert('프로젝트 생성 완료');
                fnReset();
                queryClient.invalidateQueries(['/project']);
            }
        }
    });
    async function fnRegist(){
        const project : Project = {
            prName : projectName,
            prDescription : projectDescript,
            isPrivate : projectPrivate ? "Y" : 'N',
            members : members,
            startDt : startDate,
            endDt : endDate,
        }
        registMutation.mutate(project);
    }
    function fnReset(){
        setProjectName('');
        setProjectDescript('');
        setProjectPrivate(false);
        setMembers([]);
        setStartDate(formatDateToString(new Date(),'yyyy-mm-dd',true));
        setEndDate(formatDateToString(new Date(),'yyyy-mm-dd',true));
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item xs={8}>
                <Card>
                    <CardHeader title="Create New Project"></CardHeader>

                    <CardContent>
                        <Grid item xs={12} sx={{marginTop : '2%'}}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Proejct Name</Typography>
                            <TextField margin="dense" fullWidth value={projectName} onChange={(e)=>{setProjectName(e.target.value)}} label="Project Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sx={{marginTop : '2%'}}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Private Proejct</Typography>
                            <Typography paddingLeft={'1%'} variant="body2">If you are available for hire outside of the current situation, you can encourage others to hire you.</Typography>
                            <Switch checked={projectPrivate} onChange={(e)=>{setProjectPrivate(e.target.checked)}}/>
                        </Grid>
                        <Grid item xs={12} sx={{marginTop : '2%'}}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Proejct Description</Typography>
                            <TextField multiline minRows={3} margin="dense" fullWidth value={projectDescript} onChange={(e)=>{setProjectDescript(e.target.value)}} label="Project Description" variant="outlined" />
                        </Grid>

                        {/* <Grid item xs={12} sx={{marginTop : '2%'}}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Proejct Tags</Typography>
                            <Select
                                fullWidth
                                id="demo-multiple-chip"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} onDelete={()=>{}}/>
                                    ))}
                                    </Box>
                                )}
                                >
                                {names.map((name) => (
                                    <MenuItem
                                    key={name}
                                    value={name}
                                    >
                                    {name}
                                    </MenuItem>
                                ))}
                                </Select>
                        </Grid> */}
                        <Grid container columnSpacing={3} sx={{marginTop : '2%'}}>
                            <Grid item xs={6}>
                                <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Start Date</Typography>
                                <TextField value={startDate} onChange={(e)=>{setStartDate(e.target.value)}} fullWidth type={"date"} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">End Date</Typography>
                                <TextField value={endDate} onChange={(e)=>{setEndDate(e.target.value)}} fullWidth type={"date"} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{marginTop : '2%'}}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Proejct Members</Typography>
                            <SelectMember 
                                value={members}
                                onChange={setMembers}
                            />
                        </Grid>
                        {/* 하단 버튼 영역 */}
                        <Grid item xs={12} sx={{marginTop : '3%'}}> 
                            <Grid container>
                                <Grid item xs={6}>
                                    <Stack direction="row" spacing={2}>
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack justifyContent={"flex-end"} direction="row" spacing={2}>
                                        <Button color="error" variant="outlined" onClick={fnReset}>Reset</Button>
                                        <Button variant="contained" onClick={fnRegist}>Save</Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}