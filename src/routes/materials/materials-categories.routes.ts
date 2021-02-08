import { Router } from 'express'
import Category from '../../models/materials/categories/category.model'

const router = Router()

const url = '/materials/categories'

router
  .route(url)
  .get(async (_, res) => {
    try {
      const found = await Category.find()
      console.log(found)
      res.json(found)
    } catch (e) {
      console.log(e)
      res.status(500).json(e)
    }
  })
  .post(async (req, res) => {
    try {
      console.log(req.body)
      await new Category({ ...req.body }).save()
      res.status(201).json(null)
    } catch (e) {
      res.status(500).json(e)
    }
  })

router
  .route(`${url}/:id`)
  .get(async (req, res) => {
    try {
      res.json(await Category.findById(req.params.id))
    } catch (e) {
      console.log(e)
      res.status(500).json(e)
    }
  })
  .patch(async (req, res) => {
    try {
      const updated = await Category.findByIdAndUpdate(req.params.id, {
        ...req.body,
      })
      res.json(updated)
    } catch (e) {
      res.status(500).json(e)
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params
      await Category.findByIdAndDelete(id)

      res.json(`Record ${id} has been deleted`)
    } catch (e) {
      res.status(500).json(e)
    }
  })

export default router
