// EmbeddingSelect.tsx
import { FormControl, FormLabel, Select, Spinner } from '@chakra-ui/react';

const embeddings = ['Google', 'OpenAI'];
export const EmbeddingSelect = ({
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
        {embeddings.map((emb) => (
          <option key={emb} value={emb}>
            {emb}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default EmbeddingSelect;
