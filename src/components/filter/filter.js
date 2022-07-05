import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, Input, Text, Select, Button, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

class Filter extends React.Component {
    state = {
        time: [0, 600],
        date: "",
        category: "All",
        filterDisplay: 'none'
    }

    handleFilter = () => {
        this.props.onFilter(this.state)
    }

    handleCancel = () => {
        this.setState({ time: [0, 600], date: "", category: "All" })
    }

    animationKeyframes = keyframes`from{transform: translate(-100%)} to{transform: translate(0))}`
    animation = `${this.animationKeyframes} 0.5s ease-in-out`

    render() {
        return (
            <>
            <Button onClick={() => this.setState({ filterDisplay: (this.state.filterDisplay === 'none')? 'block' : 'none' })} display={{ base: 'block', sm: 'block', md:'none' }} position='fixed' top='0px' left='0' h={'58px'}zIndex='10000' bgColor={'transparent'} borderRadius='0px' border={'1px solid rgba(73, 72, 72, 0.118)'}><HamburgerIcon /></Button>
            <Box as={motion.div} animation={this.animation} w={['100%', '100%', '300px']} h={['100%', '100%', 'auto']} display={{ base: this.state.filterDisplay, sm: this.state.filterDisplay, md:'block' }} zIndex={{ base: '100', sm: '100', md: '0'}} position={{ base: 'fixed', sm: 'fixed', md: 'initial' }} top={"50px"} right={'0'} className="filter" p={9} pt='4' m={2} borderRadius={"10px"} bgColor={"#fff"} border={"1px solid rgba(153, 153, 153, 0.197)"}>
                <Text fontWeight={600} p={2}>Filter</Text>
                <hr color="rgba(153, 153, 153, 0.697)" />
                <Box pt={2}>
                    <Text pt={1}>Time range(mins):</Text>
                    <RangeSlider defaultValue={[this.state.time[0], this.state.time[1]]} colorScheme='purple' onChangeEnd={(val) => this.setState({ time: val })} m={'10px 0'} max={600}>
                        <RangeSliderTrack bg={'purple.100'}>
                            <RangeSliderFilledTrack />
                        </RangeSliderTrack>
                        <RangeSliderThumb boxShadow={'2px 3px 10px rgba(73, 72, 72, 0.318)'} index={0}/>
                        <RangeSliderThumb boxShadow={'2px 3px 10px rgba(73, 72, 72, 0.318)'}  index={1}/>
                    </RangeSlider>
                    
                    <Flex justify={'space-between'} mt='-10px' mb={2}>
                        <Text>{this.state.time[0]}</Text>
                        <Text>{this.state.time[1]}</Text>
                    </Flex>
                </Box>
                <hr color="rgba(153, 153, 153, 0.697)" />
                <Box pt={2}>
                    <Text pt={1}>Date</Text>
                    <Input type='date' fontSize={'10px'} m={'10px 0'} value={this.state.date} onChange={(e) => this.setState({ date: e.target.value })}/>
                </Box>
                <hr color="rgba(153, 153, 153, 0.697)" />
                <Box pt={2}>
                    <Text pt={1}>Category</Text>
                    <Select type='date' fontSize={'10px'} m={'10px 0'}  value={this.state.category} onChange={(e) => this.setState({ category: e.target.value })}>
                        <option>All</option>
                        <option>Completed</option>
                        <option>Remaining</option>
                    </Select>
                </Box>
                <hr color="rgba(153, 153, 153, 0.697)" />
                <Flex pt={2}>
                    <Button fontSize={10} bgColor={'white.400'} color={"#000"} borderRadius={"3px 0 0 3px"} border={'1px solid rgba(153, 153, 153, 0.197)'} onClick={this.handleCancel}>Clear</Button>
                    <Button flex={1} fontSize={10} bgColor={'purple.400'} color={"#fff"} borderRadius={"0 3px 3px 0"} border={'1px solid rgba(153, 153, 153, 0.397)'} onClick={this.handleFilter}>Apply</Button>
                </Flex>
            </Box>
            </>
        )
    }
}

export default Filter;