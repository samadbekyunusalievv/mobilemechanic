const express = require("express");
const userRouter = require('./routes/users.routes')
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const PORT = process.env.PORT || 8080


const app = express();
app.use(cors({ origin: '*' }));

// Configure multer storage for the "hackathon/photo" directory
const storage = multer.diskStorage({
  destination: './hackathon/photo',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage: storage });

// Define an Express route for handling file uploads
app.post('/upload', upload.single('profile'), (req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const id = req.body.id;
  console.log(id);
  const path = req.file.path;
  console.log(path);
  console.log(req.file); 

  //const newPerson = await db.query('INSERT INTO users (name, surname, email, password) values ($1,$2,$3,$4) RETURNING * ', [name,surname,email,heshpassword])



  res.json({ message: 'File uploaded successfully!' });
});



app.use(express.json())
app.use('/api',userRouter)


app.listen(PORT, function () {
	console.log(
		'server is running on port'
	);
})
