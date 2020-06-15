import {getReports, getReportsCount} from 'services/reports-service';

export default async (req, res) => {
  const {method} = req;
  const {pageSize, pageNumber} = req.query;

  try {
    if (method == 'GET') {
      const reports = await getReports(
        Number.parseInt(pageSize),
        Number.parseInt(pageNumber)
      );
      const reportsCount = await getReportsCount();
      return res.status(200).json({
        success: true,
        reports,
        reportsCount,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send({success: false});
  }

  return res.status(405).send({success: false});
};
