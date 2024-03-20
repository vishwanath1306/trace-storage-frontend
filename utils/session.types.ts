export interface SessionType {
  created_at: string;
  embedding_method: string;
  id: string;
  name: string;
  status: boolean;
  updated_at: string;
  vector_store: string;
  application_name: string;
}

export interface CreateSessionData {
  sessionName: string;
  vectorStore: string;
  embedding: string;
  file: File;
  application: string;
}
