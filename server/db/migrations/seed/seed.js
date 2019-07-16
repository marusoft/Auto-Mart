import dotenv from 'dotenv';
import moment from 'moment';
import pool from '../../connection';
import Helper from '../../../helpers/HelperUtils';

dotenv.config();

const password = process.env.PASSWORD;
const hashedPassword = Helper.hashPassword(password);

const addAllsqlTableQueries = `
      INSERT INTO users(email, first_name, last_name, password, address, is_admin) 
      VALUES ('alimi@automart.com', 'kehinde', 'alimi', '${hashedPassword}', '3, Olourunosebi street, Oni, Lagos.', true),
             ('moyosore@automart.com', 'moyosore', 'omodada', '${hashedPassword}', '3,Talomoola Street, ajumobi, Lagos.', false);

      INSERT INTO cars(id, owner_id, created_on, state, status, price, manufacturer, model, body_type, img_url) 
      VALUES (1, 2, '${moment(new Date())}', 'new', 'available', 4000000, 'Peugeot', 'SUV', 'Car', 
             'http://car-img.com/peugeot.jpg'),
             (2, 1, '${moment(new Date())}', 'used', 'sold', 1500000, 'Mack', 'Diecast', 'Trailer', 'http://car-img.com/mack.jpeg'),
             (3, 2, '${moment(new Date())}', 'new', 'available', 2500000, 'Volkswagen', 'PickUp', 'Truck', 'http://some-car-img.com/volkswagen.jpg');
            
      INSERT INTO orders(id, buyer_id, car_id, created_on,  status, price_offered) 
      VALUES (1, 2, 3, '${moment(new Date())}', 'pending', 5670000),
             (2, 1, 3, '${moment(new Date())}', 'accepted', 69800000),
             (3, 2, 1, '${moment(new Date())}', 'rejected', 79800000);

      INSERT INTO flag(id, car_id, created_on, reason, description) 
      VALUES (1, 2, '${moment(new Date())}', 'weired demands', 'Because of weired demands'),
             (2, 3, '${moment(new Date())}', 'pricing', 'Because of unstable price'),
             (3, 2, '${moment(new Date())}', 'place of advert', 'Because of unstrusted place of advert');       
      `;

/**
 * Function representing UserTableHandler
 * @returns {object} representing sucess or failure
 */
async function insertAllToTables() {
  try {
    const create = await pool.query(addAllsqlTableQueries);
    // eslint-disable-next-line no-console
    console.log(`addAllsqlTableQueries: ${create[0].command}PED`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`addAllsqlTableQueries: ${error}`);
  }
}

export default insertAllToTables;
