import { SearchResponse } from '@/utils/session.types';
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useSession } from './SessionProvider';
import { ArrowDownIcon, ArrowUpIcon, UpDownIcon } from '@chakra-ui/icons';

export interface ChatMessageType {
  text: string;
  response: any;
  log_lines?: SearchResponse['log_lines'];
}
export const ChatMessages = ({
  chatMessages,
}: {
  chatMessages: ChatMessageType[];
}) => {
  return (
    <VStack spacing={4} alignItems="stretch" w="full">
      {chatMessages.map((msg, idx) => (
        <MessageDisplay key={idx} msg={msg} />
      ))}
    </VStack>
  );
};
const MessageDisplay = ({ msg }: { msg: ChatMessageType }) => {
  const { setLogLines } = useSession();
  const [show, setShow] = React.useState(true);
  return (
    <Box p={4} bg="gray.100" borderRadius="md">
      <Box>
        <Text fontWeight="bold">You:</Text>
        <Text>{msg.text}</Text>
      </Box>
      <Flex justifyContent="space-between">
        <Flex direction="column">
          <Flex alignItems="center" gap="2">
            <Text fontWeight="bold">Response:</Text>
            <Button
              leftIcon={show ? <ArrowUpIcon /> : <ArrowDownIcon />}
              aria-label="Show/Hide"
              size="xs"
              onClick={() => setShow(!show)}
              mt={1}
            >
              {show ? 'Collapse' : 'Expand'}
            </Button>
          </Flex>
          <Collapse in={show}>
            <Text>{msg.response}</Text>
          </Collapse>
        </Flex>
        <Button
          marginTop="auto"
          size="xs"
          variant="ghost"
          colorScheme="blue"
          minWidth="auto"
          onClick={() => {
            setLogLines(msg.log_lines || []);
          }}
        >
          View log lines
        </Button>
      </Flex>
    </Box>
  );
};
