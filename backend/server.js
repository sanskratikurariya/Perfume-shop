const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.log('MongoDB connection error:', err);
});


app.get('/', (req, res) => {
  res.send('Perfume Shop API Home');
});



app.use('/api/products', require('./routes/products'));
app.use('/api/reviews', require('./routes/reviews'));



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../fronted/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../fronted/dist', 'index.html'));
  });
}




const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));