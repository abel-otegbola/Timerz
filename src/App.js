import React from 'react'
import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
import Filter from './components/filter/filter';
import Navbar from './components/navbar/navbar';
import TimersDashboard from './Timers/TimersDashboard';

class App extends React.Component {
  state = {
    query: "",
    started: 0,
    filters: {}
  }

  onSearch = (query) => {
    this.setState({ query })
  }

  onStart = (index) => {
    this.setState({ started: this.state.started + index })
  }

  onFilter = (filters) => {
    this.setState({ filters })
  }

  render() {
    return (
      <ChakraProvider>
        <Box className='App'>
          <Navbar onSearch={this.onSearch} started={this.state.started}/>
          <Flex bgColor={"rgba(153, 153, 153, 0.400)"}>
            <Filter onFilter={this.onFilter}/>
            <TimersDashboard query={this.state.query} timerStarted={this.onStart} filters={this.state.filters}/>
          </Flex>
        </Box>
      </ChakraProvider>
    )
  }
}

export default App;
