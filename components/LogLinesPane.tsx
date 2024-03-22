import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useSession } from './SessionProvider';

export const LogLinesPane = () => {
  const { logLines, setLogLines } = useSession();

  if (!logLines || logLines.length === 0) {
    return <Box></Box>;
  }
  return (
    <Box height="100vh" borderLeft="1px solid" borderColor="gray.300">
      <Flex gap="4" alignItems="center" padding="2">
        <Text fontSize="lg">Log Lines</Text>
        <Button size="xs" onClick={() => setLogLines([])}>
          Hide
        </Button>
      </Flex>
      <Tabs>
        <TabList>
          {logLines.map((line) => (
            <Tab key={line.index_name}>{line.index_name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {logLines.map((line) => {
            return (
              <TabPanel
                maxWidth="400px"
                maxHeight="calc(100vh - 86px)"
                overflow="auto"
                key={line.index_name}
              >
                <Box width="100%">
                  <pre>{line.log_lines.join('\r\n')}</pre>
                </Box>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </Box>
  );
};
