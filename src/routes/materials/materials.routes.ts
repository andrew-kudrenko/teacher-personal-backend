import { Router } from 'express'
import Material from '../../models/materials/material.model'

const router = Router()
const url = '/materials'

router
  .route(url)
  .get(async (_, res) => {
    try {
      res.json(await Material.find())
    } catch (e) {
      res.json(500)
    }
  })
  .post(async (req, res) => {
    try {
      console.log(req.body)
      await new Material({ ...req.body }).save()
      res.status(201).json(null)
    } catch (e) {
      console.log(e)
      res.status(500).json(e)
    }
  })

router
  .route(`${url}/:id`)
  .get(async (req, res) => {
    try {
      res.json(await Material.findById(req.params.id))
    } catch (e) {
      res.json(500)
    }
  })
  .patch(async (req, res) => {
    try {
      console.log(req.body)
      const updated = await Material.findByIdAndUpdate(req.params.id, {
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
      console.log(id)
      await Material.findByIdAndDelete(id)

      res.json(`Record ${id} has been deleted`)
    } catch (e) {
      res.status(500).json(e)
    }
  })

export default router
