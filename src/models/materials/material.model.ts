import { Schema, model } from 'mongoose'

export const MaterialSchema = new Schema({
  title: String,
  link: String,
  category: { type: Schema.Types.ObjectId, ref: 'MaterialsCategory' },
})

export default model('Material', MaterialSchema)
