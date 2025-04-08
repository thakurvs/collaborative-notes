import axios from 'axios';
import { Note, NoteUpdatePayload, ShareNotePayload } from '../types/noteTypes';
import env from '../utils/env';

const API_BASE_URL = env.apiBaseUrl;

export const fetchNotes = async (): Promise<Note[]> => {
  const response = await axios.get(`${API_BASE_URL}/notes`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get(`${API_BASE_URL}/notes/${id}`);
  return response.data;
};

export const createNote = async (title: string): Promise<Note> => {
  const response = await axios.post(`${API_BASE_URL}/notes`, { title });
  return response.data;
};

export const updateNote = async (payload: NoteUpdatePayload): Promise<Note> => {
  const { noteId, updates } = payload;
  const response = await axios.patch(`${API_BASE_URL}/notes/${noteId}`, updates);
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/notes/${id}`);
};

export const shareNote = async (payload: ShareNotePayload): Promise<void> => {
  await axios.post(`${API_BASE_URL}/notes/${payload.noteId}/share`, { 
    email: payload.email 
  });
};