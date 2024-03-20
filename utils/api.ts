import { useQuery } from '@tanstack/react-query'

const API_ENDPOINT = process.env.REACT_APP_API_BASE_URL

console.log(API_ENDPOINT)

const SESSION_ENDPOINT = `${API_ENDPOINT}/sessions`

const fetchSessions = async (): Promise<any[]> => {
  const sessions = await fetch(`${SESSION_ENDPOINT}/get-all-sessions`)
  return sessions.json()
}

// Mock API call to simulate creating a session
const createSession = async (sessionData: any): Promise<any> => {
  // Here you would typically make a POST request to your backend to create a session.
  // Since this is a mock, we'll just return a success message.
  console.log('Creating session with data:', sessionData)
  return { message: 'Session created successfully', data: sessionData }
}

// Mock API call to simulate fetching indexes based on session ID
const fetchIndexes = async (sessionId: string): Promise<any[]> => {
  // This would be a call to fetch indexes for a specific session.
  // Returning a mock response for demonstration.
  console.log('Fetching indexes for session:', sessionId)
  return [
    { id: 'index1', name: 'Index 1' },
    { id: 'index2', name: 'Index 2' },
    // Add more mock indexes as needed
  ]
}

// Mock API call to simulate sending a search query
const sendSearchQuery = async (queryData: {
  query: string
  indexes: string[]
}): Promise<any> => {
  // Typically, you would send this data to a backend service that handles the search.
  console.log('Sending search query with data:', queryData)
  return { message: 'Query sent successfully', data: queryData }
}

// Custom hook to use the fetchSessions API call with react-query
export const useFetchSessions = () => {
  return useQuery(['sessions'], fetchSessions)
}

// Exporting the API functions so they can be used elsewhere in the project
export { fetchSessions, createSession, fetchIndexes, sendSearchQuery }
