import { Avatar } from "../../components/Avatar/Avatar";
import { Flex } from "@chakra-ui/react";

export function Home(){
    return(
      <Flex className="home-container" w="100%" h="100%" justify="center" align="center">
          <Avatar boxSize="250px"/>
      </Flex>
    )
}