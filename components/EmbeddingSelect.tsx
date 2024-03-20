// EmbeddingSelect.tsx
import { API_ENDPOINT } from '@/utils/api';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

const fetchEmbeddings = async () => {
  const response = await fetch(`${API_ENDPOINT}/get-embedding-methods`);

  return (await response.json()) as unknown as {
    [key: string]: string;
  };
};
const useEmbeddings = () => {
  const { data, isLoading, isError } = useQuery(
    ['embeddings'],
    fetchEmbeddings,
  );
  return { data, isLoading, isError };
};

export const EmbeddingSelect = ({
  value,
  setValue,
}: {
  value: string;
  setValue: Function;
}) => {
  const { data: embeddings } = useEmbeddings();
  return (
    <FormControl isRequired mb={4}>
      <FormLabel>Embedding</FormLabel>
      <Select
        placeholder="Select embedding"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {embeddings &&
          Object.keys(embeddings).map((emb) => (
            <option key={emb} value={emb}>
              {emb}
            </option>
          ))}
      </Select>
    </FormControl>
  );
};

export default EmbeddingSelect;
