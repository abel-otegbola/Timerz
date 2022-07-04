import { Flex } from '@chakra-ui/react';
import React from 'react'
import EditableTimer from './editableTimer';

class EditableTimerList extends React.Component {
    render() {
        const timers = this.props.timers.map(timer => { return (
                <EditableTimer 
                    title={timer.title}
                    id={timer.id}
                    key={timer.id}
                    project={timer.project}
                    elapsed={timer.elapsed}
                    completed={timer.completed}
                    date={timer.date}
                    runningSince={timer.runningSince}
                    onFormSubmit={this.props.onFormSubmit}
                    onTrashClick={this.props.onTrashClick}
                    onStartClick={this.props.onStartClick}
                    onPauseClick={this.props.onPauseClick}
                    onCompletedClick={this.props.onCompletedClick}
                />
            ) 
        })
        return (
            <Flex flexWrap={'wrap'} bgColor={"#fff"} p={"10px 5px"} m={2} borderRadius="10px" border={"1px solid rgba(153, 153, 153, 0.197)"}>
                {timers}
            </Flex>
        )
    }
}

export default EditableTimerList;