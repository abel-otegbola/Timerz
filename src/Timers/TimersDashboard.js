import React from "react";
import ToggleableTimerForm from "../components/timers/toggleableTimerForm";
import EditableTimerList from "../components/timers/editableTimerList";
import { Box} from "@chakra-ui/react";

class TimersDashboard extends React.Component {

    render() {
        return(
            <Box bgColor={'#fff'} m={{ base: 0, sm: 0, md: 2 }} ml={{md: 0}} borderRadius={'10px'} flex={1} mt={{ base: "65px", sm: '65px', md: 2 }}>
                <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit}/>
                <EditableTimerList 
                    onFormSubmit={this.handleEditFormSubmit} 
                    onTrashClick={this.handleTrashClick} 
                    onStartClick={this.handleStartClick}
                    onPauseClick={this.handlePauseClick}
                    onCompletedClick={this.handleCompletedClick}
                />
            </Box>
        )
    }
}

export default TimersDashboard;