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
import { ResizableBox } from 'react-resizable';
import { useSession } from './SessionProvider';

import { useWindowHeight } from '@react-hook/window-size';

export const LogLinesPane = () => {
  const { logLines, setLogLines } = useSession();
  const height = useWindowHeight();
  if (!logLines || logLines.length === 0) {
    return <Box></Box>;
  }
  return (
    <ResizableBox
      width={600}
      height={height}
      minConstraints={[100, 100]}
      maxConstraints={[1000, height]}
      resizeHandles={['w']}
      style={{
        marginLeft: 'auto',
      }}
      handle={(resizeHandle, ref) => {
        return (
          <Box
            ref={ref}
            height="100%"
            width="4px"
            borderLeft="2px solid"
            borderColor="gray.300"
            position="absolute"
            left="0"
            top="0"
            _hover={{
              cursor: 'col-resize',
              borderColor: 'blue.500',
            }}
          />
        );
      }}
    >
      <Box height="100vh">
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
                  width="100%"
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
    </ResizableBox>
  );
};
