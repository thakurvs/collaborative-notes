import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  uid: string;
  email: string;
  displayName?: string;
}

const UserSchema: Schema = new Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String }
});

export default mongoose.model<IUser>('User', UserSchema);