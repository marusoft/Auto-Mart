import flag from '../models/flagModel';

/**
 * @class Flag
 */

class Flag {
  /** flag/report a posted AD as fraudulent.
   * @static
   * @returns {object} flagPostedAdAsFraud
   * @params {object} req
   * @params {object} res
   */
  static flagPostedAdAsFraud(req, res) {
    const { carId, reason, description } = req.body;
    const id = flag[flag.length - 1].id + 1;
    const createdOn = new Date();
    const newAdReport = {
      id,
      carId,
      createdOn,
      reason,
      description,
    };
    flag.push(newAdReport);
    return res.status(201).json({
      status: 201,
      data: {
        newAdReport,
      },
      message: 'This AD is fraud',
    });
  }
}


export default Flag;
