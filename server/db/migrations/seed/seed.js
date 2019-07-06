import pool from '../../connection';
import Helper from '../../../helpers/HelperUtils';

const hashedPassword = Helper.hashPassword('passcode');

const addAllsqlTableQueries = `
      INSERT INTO users(email, firstName, lastName, password, address, isAdmin) 
      VALUES ('alimi@automart.com', 'kehinde', 'alimi', '${hashedPassword}', '3, Olourunosebi street, Oni, Lagos.', true),
             ('moyosore@automart.com', 'moyosore', 'omodada', '${hashedPassword}', '3,Talomoola Street, ajumobi, Lagos.', false);

      INSERT INTO cars(id, owner_id, state, status, price, manufacturer, model, bodyType, carImgUrl) 
      VALUES (1, 1, 'new', 'available', 4000000, 'Peugeot', 'SUV', 'Car', 'http://some-car-imag.com/peugeot.jpeg'),
             (2, 2, 'used', 'sold', 1500000, 'Mack', 'Diecast', 'Trailer', 'http://some-car-imag.com/mack.jpeg'),
             (3, 3, 'new', 'sold', 2500000, 'Volkswagen', 'PickUp', 'Truck', 'http://some-car-imag.com/volkswagen.jpg');
            
      INSERT INTO orders(order_id, buyer_id, car_id, amount, status) 
      VALUES (1, 2, 2, 4000000, 'pending'),
             (2, 3, 1, 5000000, 'accepted'),
             (3, 2, 3, 4000000, 'rejected');

      INSERT INTO flag(flag_id, car_id, reason, description) 
      VALUES (1, 2, 'weired demands', 'Because of weired demands'),
             (2, 3, 'pricing', 'Because of unstable price'),
             (3, 2, 'place of advert', 'Because of unstrusted place of advert');       
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
