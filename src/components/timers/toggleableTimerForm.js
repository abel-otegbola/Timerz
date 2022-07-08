import { PlusSquareIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import React from 'react'
import TimerForm from './TimerForm';

class ToggleableTimerForm extends React.Component {
    state = {
        isOpen: false
    }

    handleFormClose = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        if(this.state.isOpen) {
            return (
                <TimerForm onFormClose={this.handleFormClose} timer={{title: "", project: "", elapsed: [0,0,0]}}/>
            )
        }
        else {
            return (
                <Flex p={4} m={2} width={"100px"} justify={"center"} align={"center"} bgColor={"#fff"} border={'1px solid rgba(153, 153, 153, 0.197)'} borderRadius='10px'>
                    <Button m={"10px"} bgColor={'purple.400'} onClick={this.handleFormClose}><PlusSquareIcon color={"#fff"}/></Button>
                </Flex>
            )
        }
    }
}

export default ToggleableTimerForm;