import { Schema, model } from 'mongoose'

export const PortfolioSchema = new Schema({
  title: String,
  content: String,
  image: String,
})

export default model('Portfolio', PortfolioSchema)
