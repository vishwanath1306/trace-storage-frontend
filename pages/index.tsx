import { Box, Flex, Heading, Spinner } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { SessionForm } from '@/components/SessionForm'
import { SessionTable } from '@/components/SessionTable'
import type { NextPage } from 'next'

const fetchSessions = async () => {
  // This is where you would fetch data from an API.
  // For now, we're simulating fetching data by returning a mock JSON.
  const response = await fetch('/mockData/sessions.json')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const Home: NextPage = () => {
  const {
    data: sessions,
    isLoading,
    error,
  } = useQuery(['sessions'], fetchSessions)

  return (
    <Box p={4}>
      <Heading mb={6}>Log Search</Heading>
      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        <Box flex="1">
          <SessionForm />
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
  )
}

export default Home