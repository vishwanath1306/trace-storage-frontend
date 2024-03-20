import { Checkbox, CheckboxGroup, Stack, Text, VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { fetchSessionIndexes } from '@/utils/api'

interface IndexSelectionProps {
  sessionId: string | string[] | undefined
  onIndexChange: (indexes: string[]) => void
}

const IndexSelection = ({ sessionId, onIndexChange }: IndexSelectionProps) => {
  const { data: indexes, isLoading: isLoadingIndexes } = useQuery(
    ['sessionIndexes', sessionId],
    () => fetchSessionIndexes(sessionId),
    {
      enabled: !!sessionId,
    },
  )

  return (
    <VStack spacing={4} alignItems="flex-start">
      <Text fontSize="xl" fontWeight="bold">
        Indexes
      </Text>
      {isLoadingIndexes ? (
        <Text>Loading indexes...</Text>
      ) : (
        <CheckboxGroup
          colorScheme="green"
          onChange={(values) => onIndexChange(values as string[])}
        >
          <Stack spacing={2}>
            {indexes?.map((index) => (
              <Checkbox key={index} value={index}>
                {index}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      )}
    </VStack>
  )
}

export default IndexSelection
