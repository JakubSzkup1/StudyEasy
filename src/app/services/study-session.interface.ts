// Defining the structure of a study session
export interface StudySession {
  id?: string; // Optional field for session ID
  title: string; // Title of the study session
  description: string; // Description of the study session
  date: string; // Date of the study session
  time: string; // Time of the study session
}