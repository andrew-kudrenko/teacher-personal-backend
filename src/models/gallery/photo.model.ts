import { Schema, model } from 'mongoose'

export const PhotoSchema = new Schema({
  cols: Number,
  file: String,
})

export default model('Photo', PhotoSchema)
