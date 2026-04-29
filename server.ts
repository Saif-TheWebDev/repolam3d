import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, 'db.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Initialize DB if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({
    products: [],
    stats: { buys: 0, cancels: 0 }
  }, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use('/uploads', express.static(UPLOADS_DIR));

  // API Routes
  app.get('/api/products', (req, res) => {
    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    res.json(db.products);
  });

  // File Upload Route
  app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  });

  app.post('/api/products', (req, res) => {
    const { id, password } = req.body.auth || {};
    if (id !== 'lam3d' || password !== 'lam3d2026') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    const newProduct = { ...req.body.product, id: Date.now().toString() };
    db.products.push(newProduct);
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    res.json(newProduct);
  });

  app.delete('/api/products/:id', (req, res) => {
    const { id: authId, password } = req.body.auth || {};
    if (authId !== 'lam3d' || password !== 'lam3d2026') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id: productId } = req.params;
    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    db.products = db.products.filter((p: any) => p.id !== productId);
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    res.json({ success: true });
  });

  app.patch('/api/products/:id', (req, res) => {
    const { id: authId, password } = req.body.auth || {};
    if (authId !== 'lam3d' || password !== 'lam3d2026') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id: productId } = req.params;
    const { updates } = req.body;
    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    const index = db.products.findIndex((p: any) => p.id === productId);
    
    if (index !== -1) {
      db.products[index] = { ...db.products[index], ...updates };
      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
      res.json(db.products[index]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });

  app.get('/api/stats', (req, res) => {
    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    res.json(db.stats);
  });

  // Admin Auth Route
  app.post('/api/admin/login', (req, res) => {
    const { id, password } = req.body;
    if (id === 'lam3d' && password === 'lam3d2026') {
      res.json({ success: true, token: 'mock-token' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
