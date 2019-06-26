import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import userRouter from './routes/usersRoutes';
import carRouter from './routes/carRoutes';
import orderRouter from './routes/orderRoutes';
import flagRouter from './routes/flagRoutes';


const app = express();
const port = parseInt(process.env.PORT, 10) || 1440;

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const initialRouter = express.Router();

app.use('/api/v1', userRouter);
app.use('/api/v1', carRouter);
app.use('/api/v1', orderRouter);
app.use('/api/v1', flagRouter);
app.use('/', initialRouter);

initialRouter.get('/api/v1', (req, res) => res.status(200).send({
  message: 'Welcome To AutoMart MarketPlace',
}));

initialRouter.all('*', (req, res) => res.status(404).send({
  error: 'Oops!, The page you\'re looking for doesn\'t exist',
}));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server is running on port ${port}`));

export default app;
