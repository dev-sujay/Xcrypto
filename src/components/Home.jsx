import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import img from "../assets/btc.png"
import { motion } from "framer-motion"

const Home = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      w={"full"}
      h={"85vh"}>

      <motion.div
        style={{
          height: "80vh"
        }}
        animate={{
          translateY: "20px"
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          repeatType: "reverse"
        }}

      >
        <Image
          src={img}
          w={"full"}
          h={"full"}
          objectFit={"contain"}
          filter={"grayscale(1)"} />
      </motion.div>

      <Text
        textAlign={"center"}
        fontWeight={"thin"}
        fontSize={"6xl"}
        color={"whiteAlpha.700"}
        mt={"-20"}>Xcrypto</Text>

    </Box>
  )
}

export default Home
