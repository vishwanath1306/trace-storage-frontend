import { SearchResponse } from '@/utils/session.types';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { useSession } from './SessionProvider';

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
  return (
    <Box p={4} bg="gray.100" borderRadius="md">
      <Box>
        <Text fontWeight="bold">You:</Text>
        <Text>{msg.text}</Text>
      </Box>
      <Flex justifyContent="space-between">
        <Flex direction="column">
          <Text fontWeight="bold">Response:</Text>
          <Text>{msg.response}</Text>
        </Flex>
        <Button
          marginTop="auto"
          size="xs"
          variant="ghost"
          colorScheme="blue"
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
