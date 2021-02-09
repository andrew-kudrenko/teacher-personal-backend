import { Schema, model } from 'mongoose'

export const NewsSchema = new Schema({
  title: String,
  content: String,
  image: String,
})

export default model('News', NewsSchema)
