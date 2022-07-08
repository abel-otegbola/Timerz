import React from 'react'
import { Flex, Text, Box } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, LinkIcon, CheckIcon } from '@chakra-ui/icons';
import { TimersContext } from '../../context/TimersContext';
import TimerButton from '../buttons/TimerButton';

class Timer extends React.Component {
    state = {
        startButtonText: false
    }

    static contextType = TimersContext;

    handleStart = () => {
        this.props.timer.onStart();
        this.setState({ startButtonText: !this.state.startButtonText})
    }

    handlePause = () => {
        this.props.timer.onPause();
        this.setState({ startButtonText: !this.state.startButtonText})
    }

    render() {
        const { trash, start, pause, completed } = this.context
        return (
            <Box maxWidth='300px' p={4} borderRadius={"10px"} bgColor={"#fff"} border={"1px solid rgba(153, 153, 153, 0.197)"}>
                <Text m={"0 0 5px 0"} fontWeight={600}>{this.props.timer.title}</Text>
                <Text>
                    <LinkIcon 
                        border={"1px solid rgba(153, 153, 153, 0.397)"} 
                        p={1}
                        mr={2} 
                        fontSize={20} 
                        borderRadius={5}
                    />  
                {this.props.timer.project}
                </Text>
                <Text fontSize={'10px'} mt={2}>{this.props.timer.date}</Text>
                <Flex align={"center"} p={"20px 0"} fontWeight={600}>
                    <Text color={'orange.400'} mr={1}>&#9743;</Text> 
                    {`${(`${this.props.timer.elapsed[0]}`.length === 1 )? '0'+ this.props.timer.elapsed[0] : this.props.timer.elapsed[0]}:
                        ${(`${this.props.timer.elapsed[1]}`.length === 1 )? '0'+ this.props.timer.elapsed[1] : this.props.timer.elapsed[1]}:
                        ${(`${this.props.timer.elapsed[2]}`.length === 1 )? '0'+ this.props.timer.elapsed[2] : this.props.timer.elapsed[2]}`}
                </Flex>
                { 
                (!this.props.timer.completed) ? 
                <Flex justify={"space-around"} p={"10px 0"}>
                    <TimerButton 
                        onClick={this.props.onEditClick}
                        disabled={(this.props.timer.runningSince !== 0) ? true: false}
                    ><EditIcon /></TimerButton>
                    <TimerButton
                        onClick={() => trash(this.props.timer.id)}
                        disabled={(this.props.timer.runningSince !== 0) ? true: false}
                    ><DeleteIcon /></TimerButton>
                    {
                        <TimerButton 
                            onClick={() => completed(this.props.timer.id)} 
                            bgColor={'green.400'} 
                            color={"#fff"} 
                        ><CheckIcon /></TimerButton>
                    
                    }
                    { 
                        (this.state.startButtonText) ?
                            <TimerButton 
                                onClick={() => {pause(this.props.timer.id); this.setState({ startButtonText: !this.state.startButtonText })}}
                            >Pause</TimerButton>
                        :   <TimerButton 
                                bgColor={'purple.400'} 
                                color={"#fff"} 
                                onClick={() => {start(this.props.timer.id); this.setState({ startButtonText: !this.state.startButtonText })}} 
                            >Start</TimerButton>
                    }
                    
                </Flex>
                : 
                <Flex justify={"space-between"} align='center' p={"10px 0"}>
                    <Text color={'green.300'}>Completed</Text>
                    <TimerButton 
                        onClick={() => trash(this.props.timer.id)}
                    ><DeleteIcon /></TimerButton>
                </Flex>
                }
            </Box>
        )
    }
}

export default Timer;