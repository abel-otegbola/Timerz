import React from 'react'
import { Button, Flex, Text, Box } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, LinkIcon, CheckIcon } from '@chakra-ui/icons';

class Timer extends React.Component {
    state = {
        startButtonText: false
    }

    handleStart = () => {
        this.props.onStart();
        this.setState({ startButtonText: !this.state.startButtonText})
    }

    handlePause = () => {
        this.props.onPause();
        this.setState({ startButtonText: !this.state.startButtonText})
    }

    render() {
        return (
            <Box p={4} borderRadius={"10px"} bgColor={"#fff"} border={"1px solid rgba(153, 153, 153, 0.197)"}>
                <Text 
                    m={"0 0 5px 0"} 
                    fontWeight={600}
                >{this.props.title}</Text>
                <Text>
                    <LinkIcon 
                        border={"1px solid rgba(153, 153, 153, 0.397)"} 
                        p={1}
                        mr={2} 
                        fontSize={20} 
                        borderRadius={5}
                    />  
                {this.props.project}</Text>
                <Text 
                    fontSize={'10px'} 
                    mt={2}
                >{this.props.date}</Text>
                <Flex 
                    align={"center"} 
                    p={"20px 0"} 
                    fontWeight={600}
                >
                    <Text 
                        color={'orange.400'} 
                        mr={1}
                    >&#9743;</Text> 
                    {`${(`${this.props.elapsed[0]}`.length === 1 )? '0'+ this.props.elapsed[0] : this.props.elapsed[0]}:
                        ${(`${this.props.elapsed[1]}`.length === 1 )? '0'+ this.props.elapsed[1] : this.props.elapsed[1]}:
                        ${(`${this.props.elapsed[2]}`.length === 1 )? '0'+ this.props.elapsed[2] : this.props.elapsed[2]}`}
                </Flex>
                { 
                (!this.props.completed) ? 
                <Flex justify={"space-around"} p={"10px 0"}>
                    <Button 
                        fontSize={12} 
                        bgColor={"#fff"} 
                        border={"1px solid rgba(153, 153, 153, 0.197)"} 
                        mr={1} p={1} onClick={this.props.onEditClick}
                    ><EditIcon /></Button>
                    <Button 
                        fontSize={12} 
                        bgColor={"#fff"} 
                        border={"1px solid rgba(255, 153, 153, 0.397)"} 
                        mr={1} p={1} 
                        onClick={this.props.onTrashClick}
                        disabled={(this.props.runningSince !== 0) ? true: false}
                    ><DeleteIcon /></Button>
                    
                    { 
                        (this.state.startButtonText) ?
                            <Button 
                                onClick={this.handlePause} 
                                fontSize={10} 
                                bgColor={'red.400'} 
                                color={"#fff"} 
                                borderRadius={"3px"}
                            >Pause</Button>
                        :   <Button 
                                flex={1} 
                                fontSize={10} 
                                bgColor={'purple.400'} 
                                color={"#fff"} 
                                borderRadius={"3px"} 
                                onClick={this.handleStart} 
                            >Start</Button>
                    }
                    {
                        <Button 
                            onClick={this.props.onCompleted} 
                            ml={1} 
                            fontSize={10} 
                            bgColor={'green.400'} 
                            color={"#fff"} 
                            borderRadius={"3px"}
                        ><CheckIcon /></Button>
                    
                    }
                </Flex>
                : 
                <Flex justify={"space-between"} align='center' p={"10px 0"}>
                    <Text color={'green.300'}>Completed</Text>
                    <Button 
                        fontSize={12} 
                        bgColor={"#fff"} 
                        border={"1px solid rgba(255, 153, 153, 0.397)"} 
                        mr={1} 
                        p={1} 
                        onClick={this.props.onTrashClick}
                    ><DeleteIcon /></Button>
                </Flex>
                }
            </Box>
        )
    }
}

export default Timer;