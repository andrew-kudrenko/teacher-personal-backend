import multer from 'multer'
import { Router } from 'express'
import Contacts from '../../models/contacts/contacts.model'

const router = Router()
const url = '/contacts'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({ storage, fileFilter })

router
  .route(url)
  .get(async (_, res) => {
    try {
      res.json(await Contacts.find())
    } catch (e) {
      res.json(500)
    }
  })
  .post(async (req, res) => {
    try {
      console.log(req.body)
      const news = await new Contacts({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
      }).save()
      console.log(news)
      res.json(news)
    } catch (e) {
      res.json(500)
    }
  })

router.post(`${url}/upload`, upload.single('file'), async (req, res) => {
  try {
    res.json(req.file.path)
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
})

router
  .route(`${url}/:id`)
  .get(async (req, res) => {
    try {
      res.json(await Contacts.findById(req.params.id))
    } catch (e) {
      res.json(500)
    }
  })
  .patch(async (req, res) => {
    try {
      console.log(req.body)
      const updated = await Contacts.findByIdAndUpdate(req.params.id, {
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
      await Contacts.findByIdAndDelete(id)

      res.json(`Record ${id} has been deleted`)
    } catch (e) {
      res.status(500).json(e)
    }
  })

export default router
