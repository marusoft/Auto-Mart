"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _usersRoutes = _interopRequireDefault(require("./routes/usersRoutes"));

var _carRoutes = _interopRequireDefault(require("./routes/carRoutes"));

var _orderRoutes = _interopRequireDefault(require("./routes/orderRoutes"));

var _flagRoutes = _interopRequireDefault(require("./routes/flagRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = parseInt(process.env.PORT, 10) || 1450;
app.use((0, _morgan.default)('dev'));
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));

const initialRouter = _express.default.Router();

app.use('/api/v1', _usersRoutes.default);
app.use('/api/v1', _carRoutes.default);
app.use('/api/v1', _orderRoutes.default);
app.use('/api/v1', _flagRoutes.default);
app.use('/', initialRouter);
initialRouter.get('/api/v1', (req, res) => res.status(200).send({
  message: 'Welcome To AutoMart MarketPlace'
}));
initialRouter.all('*', (req, res) => res.status(404).send({
  error: 'Oops!, The page you\'re looking for doesn\'t exist'
})); // eslint-disable-next-line no-console

app.listen(port, () => console.log(`Server is running on port ${port}`));
var _default = app;
exports.default = _default;