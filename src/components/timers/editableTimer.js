import React from 'react'
import Timer from './timer';
import TimerForm from './TimerForm';

class EditableTimer extends React.Component {
    state = {
        editFormOpen: false
    };

    handleEditClick = () => {
        this.openForm()
    }

    handleFormClose = () => {
        this.closeForm()
    }

    handleSubmit = (timer) => {
        this.props.onFormSubmit(timer);
        this.closeForm();
    }

    handleTrashClick = () => {
        this.props.onTrashClick(this.props.id)
    }

    handleStartClick = () => {
        this.props.onStartClick(this.props.id)
    }

    handlePauseClick = () => {
        this.props.onPauseClick(this.props.id)
    }

    handleCompletedClick = () => {
        this.props.onCompletedClick(this.props.id)
    }

    openForm = () => {
        this.setState({ editFormOpen: true })
    }

    closeForm = () => {
        this.setState({ editFormOpen: false })
    }
    

    render() {
        if(this.state.editFormOpen) {
            return (
                <TimerForm
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    completed={this.props.completed}
                    date={this.props.date}
                    onFormSubmit={this.handleSubmit}
                    onFormClose={this.handleFormClose}
                />
            )
        }
        else {
            return (
                <Timer 
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    completed={this.props.completed}
                    date={this.props.date}
                    runningSince={this.props.runningSince}
                    onEditClick={this.handleEditClick}
                    onTrashClick={this.handleTrashClick}
                    onStart={this.handleStartClick}
                    onPause={this.handlePauseClick}
                    onCompleted={this.handleCompletedClick}
                />
            )
        }
    }
}

export default EditableTimer;