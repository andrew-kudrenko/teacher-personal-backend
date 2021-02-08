import multer, { MulterError } from 'multer'
import { Router } from 'express'
import Photo from '../../models/gallery/photo.model'

const router = Router()
const url = '/photos'

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
      res.json(await Photo.find())
    } catch (e) {
      res.json(500)
    }
  })
  .post(async (req, res) => {
    try {
      console.log(req.body)
      const photo = await new Photo({
        cols: req.body.cols,
        file: req.body.file,
      }).save()
      console.log(photo)
      res.json(photo)
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
      res.json(await Photo.findById(req.params.id))
    } catch (e) {
      res.json(500)
    }
  })
  .patch(async (req, res) => {
    try {
      console.log(req.body)
      const updated = await Photo.findByIdAndUpdate(req.params.id, {
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
      await Photo.findByIdAndDelete(id)

      res.json(`Record ${id} has been deleted`)
    } catch (e) {
      res.status(500).json(e)
    }
  })

export default router
