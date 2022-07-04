import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: 'Dark',
    useSystemColorMode: true,
}

const theme = extendTheme({ config })

export default theme