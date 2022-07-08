import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { TimersContext } from '../../context/TimersContext';

class TimerForm extends React.Component {
    state = {
        title: this.props.timer.title,
        project: this.props.timer.project,
        elapsed: this.props.timer.elapsed,
    };

    static contextType = TimersContext;

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value})
    }

    handleProjectChange = (e) => {
        this.setState({ project: e.target.value})
    }
    
    handleElapsedChange = (e, index) => {
        if(index === "hour") {
            this.setState({ elapsed: [ e.target.value, this.state.elapsed[1], this.state.elapsed[2]]})
        }
        else if(index === "min") {
            this.setState({ elapsed: [  this.state.elapsed[0], e.target.value, this.state.elapsed[2]]})
        }
        else if (index === "sec") {
            this.setState({ elapsed: [ this.state.elapsed[0], this.state.elapsed[1], e.target.value]})
        }
    }

    render() {
        const { create, edit } = this.context
        const action = (this.props.timer.id !== undefined) ? edit : create;
        const submitText = this.props.timer.id !== undefined ? 'Update' : 'create';
        return (
            <Box maxWidth={'250px'} p={2}  m={2} borderRadius={"10px"} bgColor={"#fff"} border={"1px solid rgba(153, 153, 153, 0.197)"}>
                <Box className='field' p={1}>
                    <Text fontWeight={600}>Title</Text>
                    <Input type="text" h={'25px'} defaultValue={this.state.title} onChange={this.handleTitleChange} />
                </Box>
                <Box className='field' p={1}>
                    <Text fontWeight={600}>Project</Text>
                    <Input type="text" h={'25px'} defaultValue={this.state.project} onChange={this.handleProjectChange} />
                </Box>
                <Box className='field' p={1}>
                    <Text fontWeight={600}>Time (hours-minutes-seconds)</Text>
                    <Flex justify={'space-between'}>
                        <Input type="number" h={'25px'} w='60px' defaultValue={this.state.elapsed[0]} onChange={(e) => this.handleElapsedChange(e, "hour")} />
                        <Input type="number" h={'25px'} w='60px' defaultValue={this.state.elapsed[1]} onChange={(e) => this.handleElapsedChange(e, "min")} />
                        <Input type="number" h={'25px'} w='60px' defaultValue={this.state.elapsed[2]} onChange={(e) => this.handleElapsedChange(e, "sec")} />
                    </Flex>
                </Box>
                <Button fontSize={10} m={1} bgColor={"purple.400"} color={"#fff"} onClick={() => { action({  id: this.props.timer.id, ...this.state }); this.props.onFormClose()}}>{submitText}</Button>
                <Button fontSize={10} m={1} onClick={this.props.onFormClose}>Cancel</Button>
            </Box>
        )
    }
}

export default TimerForm;