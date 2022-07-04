import React from 'react';
import { Avatar, Box, Flex, Input, Link } from '@chakra-ui/react';
import "./navbar.css";


class Navbar extends React.Component {

    handleSearch = (e) => {
        this.props.onSearch(e.target.value)
    }

    render() {
        return (
            <Flex align='center' justify="space-between" border={"1px solid rgba(153, 153, 153, 0.197)"} >
                <Box className='brand' ml={{ base: '50px', sm: '50px', md:'initial' }}>
                    <span>&#9942;</span> Timer<span>z</span>
                </Box>
                <Flex align='center' justify="space-between" flex={1} p={2}>
                    <Input type="text" placeholder='Search' borderColor={"rgba(153, 153, 153, 0.097)"} focusBorderColor={"purple.300"}
                        onChange={this.handleSearch}
                    />
                </Flex>
                <Flex>
                    <li><Link href="/">&#9743;{(this.props.started > 0)? <sup>{this.props.started}</sup> : ""}</Link></li>
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