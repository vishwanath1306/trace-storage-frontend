import { SessionForm } from '@/components/SessionForm';
import { SessionTable } from '@/components/SessionTable';
import { fetchSessions } from '@/utils/api';
import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const {
    data: sessions,
    isLoading,
    error,
    refetch: refetchSessions,
  } = useQuery(['sessions'], fetchSessions);

  return (
    <Box p={4}>
      <Heading mb={6}>Log Search</Heading>
      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        <Box flex="1">
          <SessionForm refetchSessions={refetchSessions} />
        </Box>
        <Box flex="2">
          {isLoading ? (
            <Flex justify="center" align="center" height="100%">
              <Spinner size="xl" />
            </Flex>
          ) : error ? (
            <Box textAlign="center">Failed to load sessions</Box>
          ) : (
            <SessionTable sessions={sessions} />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
