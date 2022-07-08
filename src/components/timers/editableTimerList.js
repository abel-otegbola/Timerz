import { SimpleGrid } from '@chakra-ui/react';
import React from 'react'
import EditableTimer from './editableTimer';
import { TimersContext } from '../../context/TimersContext'

class EditableTimerList extends React.Component {
    static contextType = TimersContext

    render() {
        const { timers } = this.context
        const timersList = timers.map(timer => { return (
                <EditableTimer 
                    key={timer.id}
                    timer={timer}
                />
            ) 
        })
        return (
            <SimpleGrid minChildWidth='200px' spacing='10px' flexWrap={'wrap'} bgColor={"#fff"} p={"10px"} m={2} borderRadius="10px" border={"1px solid rgba(153, 153, 153, 0.197)"}>
                {timersList}
            </SimpleGrid>
        )
    }
}

export default EditableTimerList;