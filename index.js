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

// app.all('*', (req, res) => {
//   res.send('No route found ');
// });
app.get('/', (res, req) => {
  res.json({
    text: 'Welcome to random api serve',
  });
});
app.listen(PORT, () => {
  console.log('example app listening port  ', PORT);
});
