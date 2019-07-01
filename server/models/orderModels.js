const orders = [
  {
    id: 1,
    buyerId: 2, // userId
    carId: 2,
    amount: 3500000,
    status: 'pending',
  },
  {
    id: 2,
    buyerId: 1,
    carId: 1,
    amount: 2000000,
    status: 'pending',
  },
  {
    id: 3,
    buyerId: 1,
    carId: 1,
    amount: 4000000,
    status: 'rejected',
  },
  {
    id: 4,
    buyerId: 2,
    carId: 2,
    amount: 4000000,
    status: 'pending',
  },
  {
    id: 5,
    buyer: 2,
    carId: 2,
    amount: 2000000,
    status: 'accepted',
  },
];

export default orders;
