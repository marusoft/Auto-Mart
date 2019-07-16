"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _moment = _interopRequireDefault(require("moment"));

var _connection = _interopRequireDefault(require("../../connection"));

var _HelperUtils = _interopRequireDefault(require("../../../helpers/HelperUtils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const password = process.env.PASSWORD;

const hashedPassword = _HelperUtils.default.hashPassword(password);

const addAllsqlTableQueries = `
      INSERT INTO users(email, firstName, lastName, password, address, isAdmin) 
      VALUES ('alimi@automart.com', 'kehinde', 'alimi', '${hashedPassword}', '3, Olourunosebi street, Oni, Lagos.', true),
             ('moyosore@automart.com', 'moyosore', 'omodada', '${hashedPassword}', '3,Talomoola Street, ajumobi, Lagos.', false);

      INSERT INTO cars(id, owner_id, createdOn, state, status, price, manufacturer, model, bodyType, carImgUrl) 
      VALUES (1, 2, '${(0, _moment.default)(new Date())}', 'new', 'available', 4000000, 'Peugeot', 'SUV', 'Car', 
             'http://car-img.com/peugeot.jpg'),
             (2, 1, '${(0, _moment.default)(new Date())}', 'used', 'sold', 1500000, 'Mack', 'Diecast', 'Trailer', 'http://car-img.com/mack.jpeg'),
             (3, 2, '${(0, _moment.default)(new Date())}', 'new', 'available', 2500000, 'Volkswagen', 'PickUp', 'Truck', 'http://some-car-img.com/volkswagen.jpg');
            
      INSERT INTO orders(order_id, buyer_id, car_id, createdOn,  status, priceOffered) 
      VALUES (1, 2, 3, '${(0, _moment.default)(new Date())}', 'pending', 5670000),
             (2, 1, 3, '${(0, _moment.default)(new Date())}', 'accepted', 69800000),
             (3, 2, 1, '${(0, _moment.default)(new Date())}', 'rejected', 79800000);

      INSERT INTO flag(flag_id, car_id, createdOn, reason, description) 
      VALUES (1, 2, '${(0, _moment.default)(new Date())}', 'weired demands', 'Because of weired demands'),
             (2, 3, '${(0, _moment.default)(new Date())}', 'pricing', 'Because of unstable price'),
             (3, 2, '${(0, _moment.default)(new Date())}', 'place of advert', 'Because of unstrusted place of advert');       
      `;
/**
 * Function representing UserTableHandler
 * @returns {object} representing sucess or failure
 */

async function insertAllToTables() {
  try {
    const create = await _connection.default.query(addAllsqlTableQueries); // eslint-disable-next-line no-console

    console.log(`addAllsqlTableQueries: ${create[0].command}PED`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`addAllsqlTableQueries: ${error}`);
  }
}

var _default = insertAllToTables;
exports.default = _default;