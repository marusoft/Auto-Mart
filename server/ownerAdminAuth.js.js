import cars from './models/carModels';
import users from './models/usersModels';

export const isCarOwner = (req, res, next) => {
  const { email } = req.body;
  const { id } = req.params;
  const findUser = users.find(user => user.email === email);
  const findSpecificCar = cars.find(car => car.id === parseInt(id, 10));
  if (findUser.id !== findSpecificCar.owner) {
    return res.status(401).json({
      status: 401,
      error: 'You can not edit this ad',
    });
  }
  return next();
};

export const isAdmin = (req, res, next) => {
  // eslint-disable-next-line no-shadow
  const isAdmin = req.body;
  if (isAdmin === true) {
    return next();
  }

  return res.status(401).json({
    status: 401,
    error: 'You do not have permissions to access this route',
  });
};

export const validateIsAdmin = (req, res, next) => {
  const { email } = req.body;
  const foundUser = users.find(user => user.email === email);
  if (foundUser.isAdmin) {
    return next();
  }
  return res.status(401).json({
    status: 401,
    error: 'Permission denied',
  });
};
