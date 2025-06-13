import { Avatar } from "../../components/Avatar/Avatar";
import { Flex } from "@chakra-ui/react";

export function Home(){
    return(
      <Flex className="home-container">
          <Avatar boxSize="250px"/>
      </Flex>
    )
}