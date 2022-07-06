import React from "react";
import ToggleableTimerForm from "../components/timers/toggleableTimerForm";
import EditableTimerList from "../components/timers/editableTimerList";
import { Box} from "@chakra-ui/react";
import TimersData from "../data/timersData";
import TimerStart from "../helpers/timerStart";
import CreateDate from "../helpers/createDate";

class TimersDashboard extends React.Component {
    state = {
        defaultTimers: TimersData,
        timers: [],
        intervalId: 0
    }

    componentDidMount() {
        this.setState({ query: this.props.query })
        this.setState({ timers: this.state.defaultTimers })
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.query !== prevProps.query) {
            this.setState({ query: this.props.query })
            this.handleSearch(this.props.query)
        }
        if(this.props.filters !== prevProps.filters) {
            this.setState({
                timers: this.state.defaultTimers.filter(timer => (
                    (parseFloat(timer.elapsed[0]*60) + parseFloat(timer.elapsed[1])) >= this.props.filters.time[0] &&
                    (parseFloat(timer.elapsed[0]*60) + parseFloat(timer.elapsed[1])) <= this.props.filters.time[1] && 
                    (timer.date === this.props.filters.date || this.props.filters.date === "") && 
                    ((timer.completed === (this.props.filters.category === "Completed")? true : false ) || this.props.filters.category === "All")
                ))
            })
        }
        if(this.state.defaultTimers !== prevState.defaultTimers) {
            this.setState({ timers: this.state.defaultTimers })
        }
    }

    handleCreateFormSubmit = (timer) => {
        this.createTimer(timer)
    }

    handleEditFormSubmit = (timer) => {
        this.updateTimer(timer)
    }

    handleTrashClick = (id) => {
        const newTimers = this.state.timers.filter(timer => (timer.id !== id))
        this.setState({
            defaultTimers: newTimers
        })
    }

    handleSearch = (query) => {
        const newTimers = this.state.defaultTimers.filter(timer => (timer.title.toUpperCase().indexOf(query.toUpperCase()) !== -1))
        this.setState({
            timers: newTimers
        })
    }

    handleStartClick = (id) => {
        this.startTimer(id)
    }

    handlePauseClick = (id) => {
        this.startTimer(id, "pause")
    }

    handleCompletedClick = (id) => {
        this.startTimer(id, 'completed')
    }

    createTimer = (timer) => {
        const newTimer = {
            id: this.state.timers.length,
            title: timer.title,
            project: timer.project,
            elapsed: timer.elapsed,
            completed: false,
            date: <CreateDate />,
            runningSince: 0
        }
        this.setState({
            defaultTimers: this.state.timers.concat(newTimer)
        })
    }

    updateTimer = (attr) => {
        const newData = this.state.timers.map(timer => {
                if(timer.id === attr.id) {
                    return Object.assign({}, timer, {
                        title: attr.title,
                        project: attr.project,
                        elapsed: attr.elapsed
                    })
                }
                else return timer;
        })
        this.setState({
            defaultTimers: newData
        })
    }

    startTimer = (id, action) => {
        if(action === "pause") {
            this.setState({
                defaultTimers: this.state.timers.map(timer => {
                    if(timer.id === id) {
                        clearInterval(timer.runningSince)
                        return {
                            ...timer,
                            runningSince: 0
                        }
                    }
                    else return timer;
                })
            })
            
            this.props.timerStarted(-1)
            return;
        }

        if(action === "completed") {
            this.setState({
                defaultTimers: this.state.timers.map(timer => {
                    if(timer.id === id) {
                        clearInterval(timer.runningSince)
                        if(timer.runningSince !== 0) {
                            this.props.timerStarted(-1)
                        }
                        return {
                            ...timer,
                            completed: true,
                            runningSince: 0
                        }
                    }
                    else return timer;
                })
            })
            return;
        }

        const newInterval = setInterval(() => {
            this.setState({
                defaultTimers: this.state.timers.map(timer => {
                    if(timer.id === id) {
                        if(timer.elapsed < [0,0,1]) {
                            clearInterval(timer.runningSince)
                            this.props.timerStarted(-1)
                        }
                        return {
                            ...timer,
                            elapsed: (timer.elapsed < [0,0,1])? [0,0,0] : TimerStart(timer),
                            runningSince: (timer.elapsed < [0,0,1])? 0 : newInterval,
                            completed: (timer.elapsed < [0,0,1])? true : timer.completed
                        }
                    }
                    else return timer;
                })
            })
        }, 1000)
        
        this.props.timerStarted(+1)
    }

    render() {
        return(
            <Box bgColor={'#fff'} m={{ base: 0, sm: 0, md: 2 }} ml={{md: 0}} borderRadius={'10px'} flex={1} mt={{ base: "65px", sm: '65px', md: 2 }}>
                <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit}/>
                <EditableTimerList timers={this.state.timers} 
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