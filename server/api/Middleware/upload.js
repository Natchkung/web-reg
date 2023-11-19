const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload_image')
    },
    filename: function (req, file, cb) {
      const surname = file.originalname.slice(-4,-1)+file.originalname.slice(-1)
      cb(null, 'IMG-'+req.body.personalID+surname)
    }
  })

exports.upload = multer({ storage: storage }).single('photo')