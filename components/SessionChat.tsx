import { fetchSessionIndexes, sendSearchQuery } from '@/utils/api';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Grid,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ChatMessageType, ChatMessages } from './ChatMessages';
import { LogLinesPane } from './LogLinesPane';
import Link from 'next/link';
import { ArrowBackIcon } from '@chakra-ui/icons';

export const SessionChat = ({
  sessionId,
}: {
  sessionId: string | undefined;
}) => {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [queryText, setQueryText] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);

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
        {
          text: queryText,
          // todo - change this once BE makes this a string
          response: data.result_value,
          log_lines: data.log_lines,
        },
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
    <Grid height="100vh" templateColumns="1.5fr 1fr" gap={6}>
      <Flex width="100%">
        <VStack p={4} spacing={4} alignItems="flex-start">
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

          <Button
            as={Link}
            href="/"
            size="xs"
            marginTop="auto"
            leftIcon={<ArrowBackIcon />}
          >
            Go back
          </Button>
        </VStack>
        <VStack
          p={4}
          borderLeft="1px solid"
          borderColor="gray.300"
          flex="2"
          spacing={4}
          alignItems="flex-start"
        >
          <Text fontSize="xl" fontWeight="bold">
            Search Chat
          </Text>
          <ChatMessages chatMessages={chatMessages} />
          <Textarea
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder="Enter your query here..."
          />
          <Button
            colorScheme="blue"
            onClick={handleSendQuery}
            isLoading={searchMutation.isLoading}
            isDisabled={queryText.trim() === ''}
          >
            Send
          </Button>
        </VStack>
      </Flex>
      <LogLinesPane />
    </Grid>
  );
};
