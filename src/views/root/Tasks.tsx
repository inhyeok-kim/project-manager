import { Button, Card, CardContent, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ModalTaskForm from "../../components/ModalTaskForm";
import TaskGantt from "../../components/TaskGantt";
import TaskTable from "../../components/TaskTable";

export default function Tasks(){
    const [modalMode, setModalMode] = useState<"regist" | "update">('regist');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    function modalClose(){
        setModalIsOpen(false);
        setSelectedTaskId('');
    }
    function registOpen(){
        setModalMode("regist");
        setModalIsOpen(true);
    }

    const [tabIdx,setTabId] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabId(newValue);
    };

    function updateOpen(taskId:string){
        setSelectedTaskId(taskId);
        setModalMode("update");
        setModalIsOpen(true);
    }
    const [selectedTaskId, setSelectedTaskId] = useState('');

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
                        <TaskTable onClick={updateOpen} type={'person'} />
                        :
                        <TaskGantt />
                    }
                </CardContent>
            </Card>

            { modalIsOpen?
                <ModalTaskForm taskId={selectedTaskId} mode={modalMode} isOpen={modalIsOpen} onClose={modalClose} />
                :''
            }

        </Grid>
    )
}
