import { useQuery } from '@tanstack/react-query';
import { CreateSessionData, SessionType } from './session.types';

export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_BASE_URL;
const SESSION_ID = process.env.NEXT_PUBLIC_SESSION_ID;

const fetchSessions = async (): Promise<SessionType[]> => {
  const sessions = await fetch(
    `${API_ENDPOINT}/get-all-sessions?session_id=${SESSION_ID}`,
  );
  return sessions.json();
};

const createSession = async (sessionData: CreateSessionData): Promise<any> => {
  const formData = new FormData();
  formData.append('session_name', sessionData.sessionName);
  formData.append('vector_database', sessionData.vectorStore);
  formData.append('embedding_method', sessionData.embedding);
  formData.append('request_file', sessionData.file);
  formData.append('application_name', sessionData.application);

  const response = await fetch(`${API_ENDPOINT}/create`, {
    method: 'POST',
    body: formData,
  });

  return response.json();
};

// Mock API call to simulate fetching indexes based on session ID
const fetchIndexes = async (sessionId: string): Promise<any[]> => {
  // This would be a call to fetch indexes for a specific session.
  // Returning a mock response for demonstration.
  console.log('Fetching indexes for session:', sessionId);
  return [
    { id: 'index1', name: 'Index 1' },
    { id: 'index2', name: 'Index 2' },
    // Add more mock indexes as needed
  ];
};

// Mock API call to simulate sending a search query
const sendSearchQuery = async (queryData: {
  query: string;
  indexes: string[];
}): Promise<any> => {
  // Typically, you would send this data to a backend service that handles the search.
  console.log('Sending search query with data:', queryData);
  return { message: 'Query sent successfully', data: queryData };
};

// Custom hook to use the fetchSessions API call with react-query
export const useFetchSessions = () => {
  return useQuery(['sessions'], fetchSessions);
};

// Exporting the API functions so they can be used elsewhere in the project
export { fetchSessions, createSession, fetchIndexes, sendSearchQuery };
