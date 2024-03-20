// vectorStoreselect.tsx
import { API_ENDPOINT } from '@/utils/api';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

const fetchVectorStores = async () => {
  const response = await fetch(`${API_ENDPOINT}/get-vector-databases`);

  return (await response.json()) as unknown as {
    [key: string]: string;
  };
};
const useVectorStores = () => {
  const { data, isLoading, isError } = useQuery(
    ['vectorStores'],
    fetchVectorStores,
  );
  return { data, isLoading, isError };
};

const VectorStoreSelect = ({
  value,
  setValue,
}: {
  value: string;
  setValue: Function;
}) => {
  const { data: vectorStores } = useVectorStores();
  return (
    <FormControl isRequired mb={4}>
      <FormLabel>Embedding</FormLabel>
      <Select
        placeholder="Select embedding"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {vectorStores &&
          Object.keys(vectorStores).map((vectorStore) => (
            <option key={vectorStore} value={vectorStore}>
              {vectorStore}
            </option>
          ))}
      </Select>
    </FormControl>
  );
};

export default VectorStoreSelect;
