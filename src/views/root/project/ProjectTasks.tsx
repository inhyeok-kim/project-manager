import { Button, Card, CardContent, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ModalTaskRegistForm from "../../../components/ModalTaskRegistForm";
import TaskGantt from "../../../components/TaskGantt";
import TaskTable from "../../../components/TaskTable";

export default function ProjectTasks(){
    const [registIsOpen, setRegistIsOpen] = useState(false);
    function registOpen(){
        setRegistIsOpen(true);
    }
    function registClose(){
        setRegistIsOpen(false);
    }

    const [tabIdx,setTabId] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabId(newValue);
    };

    return (
        <Grid container>
            <Card sx={{width : '100%'}}>
                <Grid container justifyContent={"center"} marginTop={"20px"} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Grid item xs={11}>
                        <Grid container >
                            <Grid item xs={6}>
                                <Tabs value={tabIdx} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="TABLE" />
                                    <Tab label="gantt"/>
                                </Tabs>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container justifyContent={"right"}>
                                    <Button variant="contained" onClick={registOpen}>New</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <CardContent>
                    {
                        tabIdx === 0 ?
                        <TaskTable type={'person'} />
                        :
                        <TaskGantt />
                    }
                </CardContent>
            </Card>

            <ModalTaskRegistForm isOpen={registIsOpen} onClose={registClose} />

        </Grid>
    )
}