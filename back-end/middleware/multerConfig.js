const multer = require('multer')
const sharp = require('sharp')

const MIMES_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    
    destination: (req, file, callback) => {
        callback(null, 'back-end/images')
    },

    filename: (req, file, callback) => {
        const name = (file.originalname.split(' ').join("_")).split('.')[0]
        const ext = MIMES_TYPES[file.mimetype]
        
        callback(null, name + '.' + ext)
      }

})

module.exports = multer({storage: storage}).single('image')
