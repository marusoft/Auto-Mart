import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

const app = express();
const port = parseInt(process.env.PORT, 10) || 1440;

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("*", (req, res) => res.status(200).send({
  message: 'It all start from localhost',
}));

app.listen(port, () => console.log(`Server is running on port ${port}`));