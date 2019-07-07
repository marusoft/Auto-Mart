import moment from 'moment';
import pool from '../../connection';
import Helper from '../../../helpers/HelperUtils';


const hashedPassword = Helper.hashPassword('passcode');
const createdOn = new Date();

const addAllsqlTableQueries = `
      INSERT INTO users(email, firstName, lastName, password, address, isAdmin) 
      VALUES ('alimi@automart.com', 'kehinde', 'alimi', '${hashedPassword}', '3, Olourunosebi street, Oni, Lagos.', true),
             ('moyosore@automart.com', 'moyosore', 'omodada', '${hashedPassword}', '3,Talomoola Street, ajumobi, Lagos.', false);

      INSERT INTO cars(id, owner_id, createdOn, state, status, price, manufacturer, model, bodyType, carImgUrl) 
      VALUES (1, 1, '${moment(new Date())}', 'new', 'available', 4000000, 'Peugeot', 'SUV', 'Car', 
             'http://car-img.com/  peugeot.jpg'),
             (2, 2, '${moment(new Date())}', 'used', 'sold', 1500000, 'Mack', 'Diecast', 'Trailer', 'http://car-img.com/mack.jpeg'),
             (3, 3, '${moment(new Date())}', 'new', 'available', 2500000, 'Volkswagen', 'PickUp', 'Truck', 'http://some-car-img.com/volkswagen.jpg');
            
      INSERT INTO orders(order_id, buyer_id, car_id, amount, status) 
      VALUES (1, 2, 2, 5000000, 'pending'),
             (2, 3, 1, 6000000, 'accepted'),
             (3, 2, 3, 7000000, 'rejected');

      INSERT INTO flag(flag_id, car_id, createdOn, reason, description) 
      VALUES (1, 2, '${createdOn}', 'weired demands', 'Because of weired demands'),
             (2, 3, '${createdOn}', 'pricing', 'Because of unstable price'),
             (3, 2, '${createdOn}', 'place of advert', 'Because of unstrusted place of advert');       
      `;

/**
 * Function representing UserTableHandler
 * @returns {object} representing sucess or failure
 */
async function insertAllToTables() {
  try {
    const create = await pool.query(addAllsqlTableQueries);
    // eslint-disable-next-line no-console
    console.log(`addAllsqlTableQueries: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`addAllsqlTableQueries ${error}`);
  }
}

export default insertAllToTables;
