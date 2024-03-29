import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import EmbeddingSelect from './EmbeddingSelect';
import VectorStoreSelect from './VectorStoreSelect';
import { createSession } from '@/utils/api';

const fetchEmbeddings = async () => {
  // Placeholder for fetching embeddings from an API
  // Replace with actual API call
  return ['Google', 'OpenAI'];
};

const fetchVectorStores = async () => {
  // Placeholder for fetching vector stores from an API
  // Replace with actual API call
  return ['Milvus', 'Pinecone'];
};

export const SessionForm = ({
  refetchSessions,
}: {
  refetchSessions: Function;
}) => {
  const toast = useToast();
  const [sessionName, setSessionName] = useState('Your session name');
  const [application, setApplication] = useState('ssh');
  const [file, setFile] = useState<File | null>(null);
  const [embedding, setEmbedding] = useState('');
  const [vectorStore, setVectorStore] = useState('');

  const { data: embeddings, isLoading: isLoadingEmbeddings } = useQuery(
    ['embeddings'],
    fetchEmbeddings,
  );
  const { data: vectorStores, isLoading: isLoadingVectorStores } = useQuery(
    ['vectorStores'],
    fetchVectorStores,
  );

  const { mutate: createSessionMutation, isLoading: isCreatingSession } =
    useMutation(createSession, {
      onSuccess: () => {
        toast({
          title: 'Session created successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        refetchSessions();
      },
      onError: () => {
        toast({
          title: 'Failed to create session.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sessionName || !application || !file || !embedding || !vectorStore) {
      toast({
        title: 'Please fill in all fields.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    createSessionMutation({
      sessionName,
      application,
      file,
      embedding,
      vectorStore,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl isRequired mb={4}>
        <FormLabel>Session Name</FormLabel>
        <Input
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired mb={4}>
        <FormLabel>Application</FormLabel>
        <Select
          placeholder="Select application"
          value={application}
          onChange={(e) => setApplication(e.target.value)}
        >
          <option value="ssh">SSH</option>
          <option value="ssh">HDFS</option>
          <option value="ssh">HTTP</option>
          <option value="ui"></option>
        </Select>
      </FormControl>
      <FormControl isRequired mb={4}>
        <FormLabel>Upload .log file</FormLabel>
        <Input
          type="file"
          accept=".log"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
      </FormControl>
      <EmbeddingSelect value={embedding} setValue={setEmbedding} />
      <VectorStoreSelect value={vectorStore} setValue={setVectorStore} />
      <Button type="submit" colorScheme="blue" isLoading={isCreatingSession}>
        Create Session
      </Button>
    </Box>
  );
};
