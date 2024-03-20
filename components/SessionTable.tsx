import { SessionType } from '@/utils/session.types';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface SessionTableProps {
  sessions: SessionType[] | undefined;
}

export const SessionTable = ({ sessions }: SessionTableProps) => {
  const router = useRouter();

  const handleViewSession = (sessionId: string) => {
    router.push(`/sessions/${sessionId}`);
  };

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
        {sessions?.map((session) => (
          <Tr key={session.id}>
            <Td>{session.application_name}</Td>
            <Td>{session.name}</Td>
            <Td>{session.vector_store}</Td>
            <Td>{session.embedding_method}</Td>
            <Td>{session.status ? 'Ready' : 'Loading'}</Td>
            <Td>
              {session.status && (
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleViewSession(session.id)}
                >
                  View
                </Button>
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
