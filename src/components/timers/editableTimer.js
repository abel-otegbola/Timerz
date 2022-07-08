import React from 'react'
import Timer from './timer';
import TimerForm from './TimerForm';

class EditableTimer extends React.Component {
    state = {
        editFormOpen: false
    };


    handleEditClick = () => {
        this.setState({ editFormOpen: true })
    }

    handleFormClose = () => {
        this.setState({ editFormOpen: false })
    }    

    render() {
        if(this.state.editFormOpen) {
            return (
                <TimerForm
                    timer={this.props.timer}
                    onFormClose={this.handleFormClose}
                />
            )
        }
        else {
            return (
                <Timer 
                    timer={this.props.timer}
                    onEditClick={this.handleEditClick}
                />
            )
        }
    }
}

export default EditableTimer;