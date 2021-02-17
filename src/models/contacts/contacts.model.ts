import { Schema, model } from 'mongoose'

export const ContactsSchema = new Schema({
  title: String,
  content: String,
  image: String,
})

export default model('Contacts', ContactsSchema)
