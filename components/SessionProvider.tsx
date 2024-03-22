import { SearchResponse } from '@/utils/session.types';
import { createContext, useContext, useState } from 'react';

export const SessionContext = createContext(
  {} as {
    logLines: SearchResponse['log_lines'];
    setLogLines: (lines: SearchResponse['log_lines']) => void;
  },
);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [logLines, setLogLines] = useState<SearchResponse['log_lines']>([]);
  return (
    <SessionContext.Provider
      value={{
        logLines,
        setLogLines,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
