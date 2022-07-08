import React from 'react';
import { Avatar, Box, Flex, Input, Link } from '@chakra-ui/react';
import "./navbar.css";
import { TimersContext } from '../../context/TimersContext';


class Navbar extends React.Component {
    static contextType =  TimersContext;

    handleSearch = (e) => {
        this.props.onSearch(e.target.value)
    }

    render() {
        const { search, timerStarted } = this.context
        return (
            <Flex bgColor={'#fff'} zIndex='1000' align='center' justify="space-between" border={"1px solid rgba(153, 153, 153, 0.197)"} position={{ base: "fixed", sm: 'fixed', md:'initial' }} top='0' left={0} width='100%' >
                <Box className='brand' ml={{ base: '50px', sm: '50px', md:'initial' }}>
                    <span>&#9942;</span> Timer<span>z</span>
                </Box>
                <Flex align='center' justify="space-between" flex={1} p={2}>
                    <Input type="text" placeholder='Search' borderColor={"rgba(153, 153, 153, 0.097)"} focusBorderColor={"purple.300"}
                        onChange={(e) => search(e.target.value)}
                    />
                </Flex>
                <Flex>
                    <li><Link href="/">&#9743;{(timerStarted > 0)? <sup>{timerStarted}</sup> : ""}</Link></li>
                    <li><Link href="/" className='user'><Avatar width={8} height={8} m={2} bgColor={"purple.200"}/>
                        <Box className='user'>
                            <p>Danielle Ryan</p>
                            <p>Director</p>
                        </Box>
                        </Link>
                    </li>
                </Flex>
            </Flex>
        )
    }
}

export default Navbar;