import { useEffect } from 'react';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { saveNote } from '../features/notes/notesSlice';
import { AppDispatch } from '../store/store';
import { NoteUpdatePayload } from '../types/noteTypes';

const useAutoSave = (
  noteId: string | undefined, 
  content: string, 
  delay: number = 10000
): void => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const debouncedSave = debounce(() => {
      if (noteId && content) {
        const payload: NoteUpdatePayload = {
          noteId,
          updates: { content }
        };
        dispatch(saveNote(payload));
      }
    }, delay);

    debouncedSave();

    return () => {
      debouncedSave.cancel();
    };
  }, [content, noteId, dispatch, delay]);
};

export default useAutoSave;