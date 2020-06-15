import {updateReport} from 'services/reports-service';

export default async (req, res) => {
  const {
    query: {id},
    body: {ticketState},
    method,
  } = req;

  try {
    if (method == 'PUT') {
      const report = await updateReport(id, ticketState);
      return res.status(200).json({
        success: true,
        report,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send({success: false});
  }

  return res.status(405).send({success: false});
};
