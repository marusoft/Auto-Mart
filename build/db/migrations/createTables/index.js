"use strict";

var _users = _interopRequireDefault(require("./users"));

var _cars = _interopRequireDefault(require("./cars"));

var _orders = _interopRequireDefault(require("./orders"));

var _flag = _interopRequireDefault(require("./flag"));

var _seed = _interopRequireDefault(require("../seed/seed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  try {
    await (0, _users.default)();
    await (0, _cars.default)();
    await (0, _orders.default)();
    await (0, _flag.default)();
    await (0, _seed.default)();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
})();