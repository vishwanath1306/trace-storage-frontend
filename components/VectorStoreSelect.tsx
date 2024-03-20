// vectorStoreselect.tsx
import { FormControl, FormLabel, Select, Spinner } from '@chakra-ui/react';

const vectorStores = ['Milvus', 'Pinecone'];

const VectorStoreSelect = ({
  value,
  setValue,
}: {
  value: string;
  setValue: Function;
}) => {
  return (
    <FormControl isRequired mb={4}>
      <FormLabel>Embedding</FormLabel>
      <Select
        placeholder="Select embedding"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {vectorStores.map((vectorStore) => (
          <option key={vectorStore} value={vectorStore}>
            {vectorStore}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default VectorStoreSelect;
