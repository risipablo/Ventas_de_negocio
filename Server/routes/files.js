// Configurar Multer para la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });
  
  // Ruta para subir archivos
  app.post('/upload', upload.single('file'), async (req, res) => {
    const { filename, path, originalname } = req.file;
    const file = new File({ filename, path, originalName: originalname });
    await file.save();
    res.json({ message: 'File uploaded successfully' });
  });
  
  // Ruta para obtener y descargar archivos
  app.get('/files', async (req, res) => {
    const files = await File.find();
    res.json(files);
  });
  
  app.get('/files/:filename', (req, res) => {
    const filepath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filepath);
  });