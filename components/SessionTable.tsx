import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface Session {
  id: string
  applicationName: string
  sessionName: string
  vectorStore: string
  embeddingMethod: string
  status: string
}

interface SessionTableProps {
  sessions: Session[]
}

export const SessionTable = ({ sessions }: SessionTableProps) => {
  const router = useRouter()

  const handleViewSession = (sessionId: string) => {
    router.push(`/sessions/${sessionId}`)
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Application Name</Th>
          <Th>Session Name</Th>
          <Th>Vector Store</Th>
          <Th>Embedding Method</Th>
          <Th>Status</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sessions.map((session) => (
          <Tr key={session.id}>
            <Td>{session.applicationName}</Td>
            <Td>{session.sessionName}</Td>
            <Td>{session.vectorStore}</Td>
            <Td>{session.embeddingMethod}</Td>
            <Td>{session.status}</Td>
            <Td>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => handleViewSession(session.id)}
              >
                View
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
