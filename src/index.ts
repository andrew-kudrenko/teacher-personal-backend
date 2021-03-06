import express from 'express'
import dotenv from 'dotenv'
import materialsRoutes from './routes/materials/materials.routes'
import materialsCategoriesRoutes from './routes/materials/materials-categories.routes'
import galleryRoutes from './routes/gallery/gallery.routes'
import newsRoutes from './routes/news/news.routes'
import contactsRoutes from './routes/contacts/contacts.routes'
import parentsRoutes from './routes/parents/parents.routes'
import portfolioRoutes from './routes/portfolio/portfolio.routes'
import { connect } from './helpers/mongodb.helpers'

dotenv.config()

const PORT = process.env.PORT ?? 5000
const app = express()

app.use('/uploads', express.static('uploads'))
app.use(express.json())
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', '*')
  next()
})
app.use('/', materialsCategoriesRoutes)
app.use('/', materialsRoutes)
app.use('/', galleryRoutes)
app.use('/', newsRoutes)
app.use('/', contactsRoutes)
app.use('/', parentsRoutes)
app.use('/', portfolioRoutes)

app.listen(PORT, async () => {
  await connect()
  console.log(`Server is running in http://localhost:${PORT}`)
})
