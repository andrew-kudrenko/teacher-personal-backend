import { Schema, model } from 'mongoose'

export const ParentsSchema = new Schema({
  title: String,
  content: String,
  image: String,
})

export default model('Parents', ParentsSchema)
