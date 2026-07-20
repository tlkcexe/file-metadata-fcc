const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Home route
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// File upload route
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  // ✅ EXACT response expected by FCC
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});