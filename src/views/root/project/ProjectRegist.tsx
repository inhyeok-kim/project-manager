import { Box, Button, Card, CardContent, CardHeader, Chip, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Stack, Switch, TextField, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect, useState } from "react";
import { textAlign } from "@mui/system";
import SelectMember from "../../../components/SelectMember";



const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

export default function Regist(){
    const [projectName, setProjectName] = useState('');
    const [projectDescript, setProjectDescript] = useState('');
    const [projectPrivate, setProjectPrivate] = useState(false);
    
    const [memberId, setMemberId] = useState([]);
    
    const [personName, setPersonName] = useState<string[]>([]);
    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [date,setDate] = useState<Date | null>();
    return (
        <Grid container justifyContent={'center'}>
            <Grid xs={8}>
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

                        <Grid item xs={12} sx={{marginTop : '2%'}}>
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
                        </Grid>
                        <Grid container columnSpacing={3} sx={{marginTop : '2%'}}>
                            <Grid item xs={6}>
                                <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Start Date</Typography>
                                <TextField fullWidth type={"date"} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">End Date</Typography>
                                <TextField fullWidth type={"date"} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{marginTop : '2%'}}>
                            <Typography color={blueGrey[800]} paddingLeft={'1%'} variant="subtitle2">Proejct Members</Typography>
                            <SelectMember 
                                value={memberId}
                                onChange={setMemberId}
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
                                        <Button color="error" variant="outlined">Reset</Button>
                                        <Button variant="contained">Save</Button>
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