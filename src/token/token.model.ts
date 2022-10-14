/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

export const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

export interface TokenModel {
  id: number;
  user: string;
  refreshToken: string;
}
