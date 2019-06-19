import cars from './models/carModels';
import users from './models/usersModels';

export const isCarOwner = (req, res, next) => {
  const owner = req.body;
  const verifyOwner = users.find(user => owner === user.firstName && user.lastName);
  if (!verifyOwner) {
    return res.status(401).json({
      success: 401,
      message: 'You need to create an account',
    });
  }
  return next();
};
export const isAdminUser = (req, res, next) => {
  const id = Number(req.params.id);
  const findCarId = cars.find(car => car.id === id);
  const isAdmin = false;
  if (!isAdmin && findCarId) {
    const { findSpecificCar } = req.body;
    cars.splice(findSpecificCar, 1);
    return res.status(200).json({
      status: 200,
      data: 'Car Ad successfully deleted',
    });
  }
  return next();
};
