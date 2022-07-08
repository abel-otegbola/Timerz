import React, { createContext } from 'react';
import CreateDate from '../helpers/createDate';
import TimerStart from '../helpers/timerStart';

export const TimersContext = createContext();

class TimersContextProvider extends React.Component {
    state = {
        defaultTimers: [],
        timers: [],
        timerStarted: 0
    }

    componentDidMount() {
        this.setState({ timers: this.state.defaultTimers })
    }

    componentDidUpdate(prevProps, prevState) {
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

    handleFilter = (filters) => {
        const newTimers = this.state.defaultTimers.filter(timer => (
                            (parseFloat(timer.elapsed[0]*60) + parseFloat(timer.elapsed[1])) >= filters.time[0] &&
                            (parseFloat(timer.elapsed[0]*60) + parseFloat(timer.elapsed[1])) <= filters.time[1] && 
                            (timer.date === filters.date || filters.date === "") && 
                            ((timer.completed === (filters.category === "Completed")? true : false ) || filters.category === "All")
            ))
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
            
            this.setState({ timerStarted: this.state.timerStarted -1 })
            return;
        }

        if(action === "completed") {
            this.setState({
                defaultTimers: this.state.timers.map(timer => {
                    if(timer.id === id) {
                        clearInterval(timer.runningSince)
                        if(timer.runningSince !== 0) {
                            this.setState({ timerStarted: this.state.timerStarted -1 })
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
                            this.setState({ timerStarted: this.state.timerStarted -1 })
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
        
        this.setState({ timerStarted: this.state.timerStarted +1 })
    }


    createTimer = (timer) => {
        
        const newTimer = {
            id: this.state.timers.length,
            title: timer.title,
            project: timer.project,
            elapsed: timer.elapsed,
            completed: false,
            date: CreateDate(),
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

    actions = {
        create: this.handleCreateFormSubmit,
        edit: this.handleEditFormSubmit,
        start: this.handleStartClick,
        pause: this.handlePauseClick,
        completed: this.handleCompletedClick,
        search: this.handleSearch,
        filter: this.handleFilter,
        trash: this.handleTrashClick
    }

    render() {
        return (
            <TimersContext.Provider value={{...this.state, ...this.actions}}>
                { this.props.children }
            </TimersContext.Provider>
        )
    }
}

export default TimersContextProvider;