import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  useToast,
} from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const fetchEmbeddings = async () => {
  // Placeholder for fetching embeddings from an API
  // Replace with actual API call
  return ['Google', 'OpenAI']
}

const fetchVectorStores = async () => {
  // Placeholder for fetching vector stores from an API
  // Replace with actual API call
  return ['Milvus', 'Pinecone']
}

const createSession = async (sessionData: any) => {
  // Placeholder for session creation API call
  // Replace with actual API call
  console.log('Creating session with', sessionData)
  return { success: true }
}

export const SessionForm = () => {
  const toast = useToast()
  const [sessionName, setSessionName] = useState('')
  const [application, setApplication] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [embedding, setEmbedding] = useState('')
  const [vectorStore, setVectorStore] = useState('')

  const { data: embeddings, isLoading: isLoadingEmbeddings } = useQuery(
    ['embeddings'],
    fetchEmbeddings,
  )
  const { data: vectorStores, isLoading: isLoadingVectorStores } = useQuery(
    ['vectorStores'],
    fetchVectorStores,
  )

  const { mutate: createSessionMutation, isLoading: isCreatingSession } =
    useMutation(createSession, {
      onSuccess: () => {
        toast({
          title: 'Session created successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      },
      onError: () => {
        toast({
          title: 'Failed to create session.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
    })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!sessionName || !application || !file || !embedding || !vectorStore) {
      toast({
        title: 'Please fill in all fields.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return
    }
    createSessionMutation({
      sessionName,
      application,
      file,
      embedding,
      vectorStore,
    })
  }

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
          <option value="SSH">SSH</option>
          <option value="UI">UI</option>
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
      <FormControl isRequired mb={4}>
        <FormLabel>Embedding</FormLabel>
        <Select
          placeholder="Select embedding"
          value={embedding}
          onChange={(e) => setEmbedding(e.target.value)}
        >
          {isLoadingEmbeddings ? (
            <Spinner />
          ) : (
            embeddings?.map((emb: string) => (
              <option key={emb} value={emb}>
                {emb}
              </option>
            ))
          )}
        </Select>
      </FormControl>
      <FormControl isRequired mb={4}>
        <FormLabel>Vector Store</FormLabel>
        <Select
          placeholder="Select vector store"
          value={vectorStore}
          onChange={(e) => setVectorStore(e.target.value)}
        >
          {isLoadingVectorStores ? (
            <Spinner />
          ) : (
            vectorStores?.map((store: string) => (
              <option key={store} value={store}>
                {store}
              </option>
            ))
          )}
        </Select>
      </FormControl>
      <Button type="submit" colorScheme="blue" isLoading={isCreatingSession}>
        Create Session
      </Button>
    </Box>
  )
}
