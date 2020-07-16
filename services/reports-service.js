import connect from 'utils/connection';
import Report from 'models/Report';

export async function updateReport(id, state) {
  await connect();

  return Report.findByIdAndUpdate(
    id,
    {state},
    {
      new: true,
      runValidators: true,
    }
  );
}

export async function getReports(pageSize, pageNumber) {
  await connect();

  return Report.find({
    state: {$ne: 'CLOSED'},
  })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
}

export async function getReportsCount() {
  await connect();

  return Report.countDocuments({
    state: {$ne: 'CLOSED'},
  });
}
