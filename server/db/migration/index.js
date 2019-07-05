import createUsersTable from './users';
import createCarsTable from './cars';
import createOrderTable from './orders';
import createFlagTable from './flag';


(async () => {
  try {
    await createUsersTable();
    await createCarsTable();
    await createOrderTable();
    await createFlagTable();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
})();
