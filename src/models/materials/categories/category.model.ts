import { Schema, model } from 'mongoose'

export const MaterialsCategorySchema = new Schema({
  title: String,
})

export default model('MaterialsCategory', MaterialsCategorySchema)
