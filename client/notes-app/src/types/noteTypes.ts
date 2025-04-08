export interface Note {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    owner: User;
    sharedWith: User[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface User {
    _id: string;
    uid: string;
    email: string;
    displayName: string;
  }
  
  export interface NoteUpdatePayload {
    noteId: string;
    updates: Partial<Note>;
  }
  
  export interface ShareNotePayload {
    noteId: string;
    email: string;
  }