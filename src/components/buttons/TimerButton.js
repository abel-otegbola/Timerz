import { Button } from '@chakra-ui/react';
import React from 'react';

class TimerButton extends React.Component {
    render() {
        return (
            <Button 
                flex={1}
                fontSize={12} 
                bgColor={(this.props.bgColor) || "#fff"} 
                color={(this.props.color) || "#000"} 
                border={"1px solid rgba(153, 153, 153, 0.397)"} 
                mr={1} p={1}
                onClick={this.props.onClick}
                disabled={this.props.disabled}
                maxWidth='60px'
            >
            { this.props.children }
            </Button>
        )
    }
}

export default TimerButton;