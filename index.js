var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');

// Ρύθμιση του multer (τα αρχεία αποθηκεύονται προσωρινά στη μνήμη ή σε φάκελο uploads)
const upload = multer({ dest: 'uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// POST endpoint για το ανέβαστη αρχείου (το input πρέπει να ονομάζεται "upfile")
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  // Επιστρέφει τα ζητούμενα metadata: όνομα, τύπο και μέγεθος
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});