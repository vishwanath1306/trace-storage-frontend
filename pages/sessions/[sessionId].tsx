import { fetchSessionIndexes, sendSearchQuery } from '@/utils/api';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SessionPage = () => {
  const router = useRouter();
  const { sessionId } = router.query;
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [queryText, setQueryText] = useState('');
  const [chatMessages, setChatMessages] = useState<
    { text: string; response: any }[]
  >([]);

  const { data: indexes, isLoading: isLoadingIndexes } = useQuery(
    ['sessionIndexes', sessionId],
    () => fetchSessionIndexes(sessionId as string),
    {
      enabled: !!sessionId,
    },
  );

  const searchMutation = useMutation(sendSearchQuery, {
    onSuccess: (data) => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: queryText, response: data.result_value.join(' ') },
      ]);
      setQueryText('');
    },
  });
  const handleCheckboxChange = (values: string[]) => {
    setSelectedIndexes(values);
  };

  const handleSendQuery = () => {
    if (queryText.trim() !== '') {
      searchMutation.mutate({
        query: queryText,
        indexes: selectedIndexes,
        sessionId: sessionId as string,
      });
    }
  };
  return (
    <Box display="flex" flexDirection="row" p={4}>
      <VStack flex="1" spacing={4} alignItems="flex-start">
        <Text fontSize="xl" fontWeight="bold">
          Indexes
        </Text>
        {isLoadingIndexes ? (
          <Text>Loading indexes...</Text>
        ) : (
          <CheckboxGroup colorScheme="green" onChange={handleCheckboxChange}>
            <Stack spacing={2}>
              {indexes?.index_names?.map((index) => (
                <Checkbox key={index} value={index}>
                  {index}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        )}
      </VStack>
      <VStack flex="2" spacing={4} alignItems="flex-start">
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
    </Box>
  );
};

export default SessionPage;
