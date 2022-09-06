const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const userRoute = require('./routes/user.route');

app.use(express.json());
app.use(cors());

// app.use(errorHandler);
app.use('/user', userRoute);

app.get('/', (req, res) => {
  res.json({
    text: 'Welcome to random api serve',
  });
});
app.all('*', (req, res) => {
  res.send('No route found ');
});
app.listen(PORT, () => {
  console.log('example app listening port  ', PORT);
});
