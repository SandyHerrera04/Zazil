const multer = require('multer');
const path = require('path');

// Configuración para almacenar imágenes en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se almacenarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Guardar archivo con un nombre único
  }
});

// Filtrar tipos de archivos para asegurar que solo imágenes sean subidas
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    cb(null, true); // Aceptar archivo
  } else {
    cb(new Error("Solo se permiten imágenes con formatos .jpeg, .jpg o .png."), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limitar el tamaño del archivo a 5 MB
  fileFilter: fileFilter
});

module.exports = upload;
