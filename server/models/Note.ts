import mongoose, { Document, Schema, Types } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  tags: string[];
  owner: Types.ObjectId;
  sharedWith: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  tags: { type: [String], default: [] },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sharedWith: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model<INote>('Note', NoteSchema);