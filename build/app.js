"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _usersRoutes = _interopRequireDefault(require("./routes/usersRoutes"));

var _carRoutes = _interopRequireDefault(require("./routes/carRoutes"));

var _orderRoutes = _interopRequireDefault(require("./routes/orderRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = parseInt(process.env.PORT, 10) || 1440;
app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use('/api/v1', _usersRoutes["default"]);
app.use('/api/v1', _carRoutes["default"]);
app.use('/api/v1', _orderRoutes["default"]);
app.get('*', function (req, res) {
  return res.status(200).send({
    message: 'It all start from localhost!!!'
  });
}); // eslint-disable-next-line no-console

app.listen(port, function () {
  return console.log("Server is running on port ".concat(port));
});
var _default = app;
exports["default"] = _default;