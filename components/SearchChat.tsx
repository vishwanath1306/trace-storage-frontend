import { Box, Button, Text, Textarea, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendSearchQuery } from '@/utils/api';

interface SearchChatProps {
  sessionId: string;
  selectedIndexes: string[];
}

const SearchChat = ({ sessionId, selectedIndexes }: SearchChatProps) => {
  const [queryText, setQueryText] = useState('');
  const [chatMessages, setChatMessages] = useState<
    { text: string; response: string }[]
  >([]);

  const searchMutation = useMutation(sendSearchQuery, {
    onSuccess: (data) => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: queryText, response: data.result_value.join(' ') },
      ]);
      setQueryText('');
    },
  });

  const handleSendQuery = () => {
    if (queryText.trim() !== '') {
      searchMutation.mutate({
        sessionId,
        query: queryText,
        indexes: selectedIndexes,
      });
    }
  };

  return (
    <VStack spacing={4} alignItems="flex-start" w="full">
      <Text fontSize="xl" fontWeight="bold">
        Search Chat
      </Text>
      <VStack spacing={4} alignItems="stretch" w="full">
        {chatMessages.map((msg, idx) => (
          <Box key={idx} p={4} bg="gray.100" borderRadius="md">
            <Text fontWeight="bold">You:</Text>
            <Text>{msg.text}</Text>
            <Text fontWeight="bold">Response:</Text>
            <Text>{msg.response}</Text>
          </Box>
        ))}
      </VStack>
      <Textarea
        value={queryText}
        onChange={(e) => setQueryText(e.target.value)}
        placeholder="Enter your query here..."
      />
      <Button
        colorScheme="blue"
        onClick={handleSendQuery}
        isLoading={searchMutation.isLoading}
      >
        Send
      </Button>
    </VStack>
  );
};

export default SearchChat;
