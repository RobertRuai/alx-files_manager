const express = require('express');
import router from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/', router);

//router(app);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
